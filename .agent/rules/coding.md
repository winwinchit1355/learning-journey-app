# Coding Rules

## Language

- JavaScript only — no TypeScript. Do not add `.ts`/`.tsx` files or TS type annotations.

## Style

- Prettier default config. ESLint via `expo lint`.
- Naming: `camelCase` vars/functions, `PascalCase` components, `snake_case` DB.
- No dead code, no unused imports. One `export default` per route file.

## Expo / RN specifics

- Use expo-router API for nav; never touch raw React Navigation config directly.
- Style with NativeWind classes; custom styles only in `theme.js` primitives.
- Keys on mapped components: use stable ids (uuid), never array index.
- Avoid inline closures in hot paths; memoize lists (FlashList for long lists).
- Async effects: cancel subscriptions on unmount; guard against state updates after unmount.

## Comments

- DO NOT add comments unless the logic is genuinely non-obvious. Code should read itself.
- `// TODO:` only for tracked work; reference the task file.

## Anti-patterns to avoid

- Global mutable singletons besides the DB connection.
- Storing React components or hooks inside stores.
- Date math by hand — always dayjs.
- Hardcoding a value that exists in `settings`.