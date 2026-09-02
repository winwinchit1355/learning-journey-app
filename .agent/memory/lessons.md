# Lessons

Reusable lessons learned. Latest at top.

- **Zustand selector gotcha**: never return a fresh object from a selector, e.g. `useAppStore((s) => Object.fromEntries(...))`. Zustand re-renders whenever the selector output is a new reference → triggers "Maximum update depth exceeded". Select stable slices (`s.subjects`) and derive maps with `useMemo`.
- **NativeWind v4 has no `setColorScheme` export**: calling `setColorScheme("light")` from `nativewind` throws `TypeError: (0 , _nativewind.setColorScheme) is not a function`. Force light via `app.json userInterfaceStyle: "light"` + static classes instead.
- **Expo SDK 57 + npm install order**: npm auto-resolves `react-dom` to latest (19.2.8) which conflicts with Expo's pinned React (19.2.3). Install `react-dom@19.2.3` and `react-native-web` explicitly, or use `npx expo install` for web deps.
- **babel-preset-expo not hoisted**: with Expo SDK 57 the preset can be nested under `expo/node_modules`; if Metro fails with `Cannot find module 'babel-preset-expo'`, add it as an explicit devDependency so the root `babel.config.js` can resolve it.
- **Rename hazards**: agent-guideline folders tied to a directory name (`Learning Journey App`) vanish on rename. Keep them in the repo root (`learning-journey-app`) so git carries them.
- **PDF design reading**: the current model can't ingest PDFs or images directly; convert designs to text via `pymupdf` (`page.get_text()`) — Figma-exported PDFs keep text layers, so screens are recoverable without vision.
- **Time math**: always dayjs; raw `Date` arithmetic caused DST/day-boundary bugs in past projects.
- **Migration discipline**: bump `user_version` and write idempotent DDL, or field upgrades break existing installs.
- **Form screens**: wheel pickers (Daily Goal) must be pickers, not text inputs — designs with `0-6h/5min` wheels imply options, and free text breaks the ±44pt touch target rule.