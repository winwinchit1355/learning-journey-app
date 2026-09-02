# Cloud Sync & Account Strategy — Learning Journey App

_Author: AI assistant_
_Date: 2026-08-29_
_Applies to: local-first study tracker (Expo / React Native)._

## The question

> "My app first uses phone local storage. If you create an account, you need a database. You can save your data on cloud. I don't want to write a backend API because I have no hosting server. I want to use some services. What should I do?"

## Short answer

You do **not** need a backend API or your own server. Use a **Backend-as-a-Service (BaaS)** — it gives you Authentication + a database (cloud storage) + SDKs that plug straight into your React Native app. You only write client-side code; the "server" is fully managed by the provider.

Because your app is **local-first** (SQLite on the phone is the source of truth), the cloud database is **not the app's spine** — it is only a **sync/save copy for signed-in users**. That makes the BaaS choice much simpler and lower-risk.

---

## Recommended path (top pick)

### Firebase (Firebase Auth + Firestore / Realtime Database)

- **What it gives you:** Email/password sign-up & login for free (Auth), a NoSQL cloud database (Cloud Firestore) or realtime DB for syncing study records, plus optional push notifications (Cloud Messaging) — all matching your Settings screen.
- **Why it fits here:**
  - The `.agent` docs already selected it (see `decisions.md`): **Supabase was blocked by your VPN in-country; Firebase is reachable.**
  - Free tier is generous: Firestore 1 GiB storage / 50k reads / 20k writes per day — plenty for a personal tracker.
  - React Native / Expo supports it well (the web JS SDK works with Expo Go, or the native modules with a dev build).
  - No credit card / no hosting to maintain.
- **Cost to watch:** beyond the Spark free tier, auth login is still free; Firestore storage/reads scale into paid tiers (used by most people at hobby scale: $0).
- **Downsides:** NoSQL (you design your sync document layout), Firestore security rules are a mild learning curve, and it's tied to Google.

**Decision: use Firebase for BOTH auth and cloud data sync.** One provider covers the "create account" and "save data on cloud" requirements with zero backend code.

---

## Other solid options (no backend code either)

| Service | Auth | DB / Storage | Good for | Watch out |
|---|---|---|---|---|
| **Supabase** | ✅ | ✅ Postgres (SQL) | If you want a real SQL database | **Blocked by VPN in your region** — already ruled out. Otherwise excellent. |
| **PocketBase** | ✅ | ✅ SQLite | Self-hosted single binary (you do host it, but tiny) | You must run/host it somewhere (Raspberry Pi / VPS) — you said no hosting. Best as a fallback. |
| **Appwrite** | ✅ | ✅ | Open-source self-hostable BaaS | Needs hosting; heavier than PocketBase. |
| **Clerk / Supabase Auth / AWS Cognito** | ✅ | ❌ (auth only) | Combined with your own DB | Doesn't solve the "where do I store data" half. |
| **iCloud / Android Cloud Storage** | ⚠️ | ✅ | Platform-native backup | iOS/Android asymmetry; hard to control, not portable; poor fit for a cross-platform sync you control. |
| **Custom backend (you write it)** | ❌ | ❌ | Full control | **Exactly what you said you don't want** — needs a server. Skip. |

**Recommendation priority:** 1) Firebase, 2) Supabase *if* your VPN issue changes, 3) PocketBase as a self-host fallback.

---

## How it maps to your app architecture

Your existing plan (`.agent/rules/architecture.md`) is already compatible — no redesign needed:

```
Local (source of truth)          Cloud (signed-in users only)
┌────────────────────┐          ┌─────────────────────────────┐
│ expo-sqlite        │  ──▶     │ Firestore                  │
│  subjects          │  async   │   users/{uid}/subjects     │
│  study_sessions    │  sync    │   users/{uid}/study_sessions│
│  settings          │  (P2)    │   users/{uid}/settings     │
│  learning_plan_... │          │   users/{uid}/learning_... │
└────────────────────┘          └─────────────────────────────┘
        ▲                                   │
        └──────── Firebase Auth ◀───────────┘
                 (sign up / log in)
```

### Key design rule that keeps it simple (already in your docs)

- **Firestore is a save/backup copy, never the live source.** Every read the app displays comes from local SQLite. This means:
  - The app is instant and works 100% offline (matches the design's "Not Now" path).
  - Sync is a background job you can make best-effort — network drops never break the UI.
  - Firestore security rules just read/write files under `users/{uid}/...`; a user can only touch their own folder.

### Concrete sync flow (3 steps, no backend code)

1. **Auth:** Firebase Auth email/password → `createUser` (Register) / `signInWithPassword` (Log In).
2. **Push:** after a local write, mark `updated_at`; any row with `synced_at IS NULL` gets uploaded to `users/{uid}/<table>/<id>`.
3. **Pull:** on app foreground / sign-in, fetch rows newer than the last cursor and merge locally **last-write-wins by `updated_at`**.

This matches the P2 sync plan already in `requirements.md` and `architecture.md`.

---

## What you must NOT do

- **Do not write your own REST/CRUD API** — you have no hosting, and you don't need one.
- **Do not use Firebase just for auth and then roll your own sync server** — Firestore (or Realtime DB) already stores the data; use it.
- **Do not rely on "phone local storage only + device backup"** — that is not real cross-device cloud sync and does not satisfy the "save your data on cloud" requirement you stated.

---

## Recommended next step

1. Keep the current local-first build (Phases 1–3) as already planned — finish the offline tracker **first**. Cloud is additive and should not gate core features.
2. When you reach **Phase P2 (Account / sync)**:
   - Create a Firebase project (`console.firebase.google.com`).
   - Add Firebase Web config to the Expo app.
   - Implement Register / Login UI (screens 13–15) against **Firebase Auth**.
   - Implement the push/pull sync against **Firestore**.
3. Optional later: add Expo push notifications using **Firebase Cloud Messaging** (matches the Settings toggle).

---

## Summary

> Use **Firebase Auth + Cloud Firestore**. It gives you account creation/login and cloud data storage with **zero backend code and no hosting server** — exactly what you asked for. Keep SQLite local-first as the source of truth and treat Firestore as the sync/backup copy for signed-in users. If Firebase ever becomes unusable in your region, **PocketBase** (self-host, single binary) is the swap-in fallback; **Supabase** is otherwise the best full alternative but is currently network-blocked for you.
