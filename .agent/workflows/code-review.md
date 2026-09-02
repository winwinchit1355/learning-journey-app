# Workflow: Code Review

## Scope

Run on uncommitted change sets and on branches before merge into `main`.

## Checklist

1. **Correctness**
   - SQL params bindable (no string interpolation into queries).
   - Edge cases: empty/zero, soft-deleted rows excluded, timezone/dst in date math, 15MB import cap.
2. **Consistency with rules**
   - No direct SQL from screens; stores mediate.
   - Naming, no TypeScript, Prettier/ESLint clean.
   - UI derives from design PDF; dark-mode variants present.
3. **Security**
   - No secrets in code; imports validated; no eval.
4. **Tests**
   - New logic covered (queries/merge/parsers at 100% path).
   - Regression test exists for any fixed bug.
5. **Git**
   - Commits one logical change, branch off correct parent, no untracked secrets.

## Output

Short verdict: `approve` / `request-changes` with the blocking items. Keep it bulleted, < 10 lines unless blockers found.