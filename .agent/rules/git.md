# Git Rules

## Commits

- One logical change per commit; stage only intended files.
- Never commit secrets or `.env`.
- NEVER commit unless the developer explicitly asks.
- NEVER `git push` (to any remote) without first requesting and receiving explicit permission from the developer.

## Hygiene

- `.gitignore` from start: `node_modules/`, `.expo/`, `.env*` (keep `.env.example`), `dist/`, `*.tgz`.
- PRs: branch → short description of what changed + verification output.