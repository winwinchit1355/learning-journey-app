# Security Rules

## Credentials & secrets

- NEVER commit Firebase config secrets or API keys to the repo.
- Firebase web/Expo config: use `.env` + `expo-constants` extra, git-ignored.
- Keep a `.env.example` with placeholders only.
- `auth.json`/tokens never logged; no `console.log` of user data.

## Auth

- Email/password only via Firebase Auth.
- Firestore security rules must enforce `request.auth.uid == resource.data.user_id`-style ownership (config lives with the backend deploy, documented in sync/README).
- "Remember me" → persist auth in AsyncStorage (default Firebase behavior) — never store raw passwords.

## Data

- Local SQLite is device-private; no plaintext PII beyond what the user entered (name/email).
- Export files are written to cache dir (not Documents) and cleaned after sharing.
- Import: validate before write; reject files >15MB; never evaluate imported content as code.

## General

- No eval, no codegen from user input.
- Keep RN runtime deps to the same versions Expo SDK expects.
- Review every dependency added to package.json.