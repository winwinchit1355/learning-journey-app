# Workflow: Refactor

## Steps

1. **Justify**: descrive the pain (coupling, duplication, slowness, testability). No refactor purely "for cleanliness".
2. **Baseline**: ensure tests cover the changed area; if not, add characterization tests first.
3. **Plan** the seams: what moves where; behaviour must be identical (no feature work mixed in).
4. Branch a feature branch off `main`.
5. Small commits, each leaving the tree green.
6. Verify after each commit: `npx eslint . && npx jest --silent`.
7. Update `rules/architecture.md` / `rules/coding.md` if conventions changed.
8. Report before/after structure summary to developer; merge when approved.

## Anti-goals

- No scope creep (no bug-fix or feature buried in the refactor).
- No rewrite-from-scratch without separate approval.