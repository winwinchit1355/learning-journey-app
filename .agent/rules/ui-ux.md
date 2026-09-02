# UI/UX Rules

## Source of truth

The design PDF (`G:\Projects\Learning Journey App\design\Learning Journey App.pdf`) defines every screen. Match it screen-for-screen. When in doubt, derive from the design, not by inventing.

## Layout

- Mobile-first, 9:41 status-bar mock is purely decorative — real phone uses safe areas (`react-native-safe-area-context`).
- Bottom nav: Home, Subjects, Menu (drawer toggle), History, Stats — order fixed.
- Modals: Log Session, Add Subject, Settings, Profile, Daily Goal, Auth, Export/Import — presented as modals/sheets, not tabs.

## Theme

- Design is light by default; dark mode must invert cleanly (NativeWind `dark:` variants).
- Map design colors into `theme.js` tokens once; screens reference tokens, never literal hex.

## States

Every data screen needs: empty state (matching design text, e.g. "No subjects added yet"), filled state, and graceful loading.

## Interaction feedback

- Save/Import show progress + success summaries exactly as designed (p.18/19).
- "Add Study" opens the Log Session flow from Home.
- Form validation inline; no silent failures.

## Distance rules

- Touch targets ≥ 44pt. Contrast meets WCAG AA in both themes.
- Numeric inputs where the design shows wheels (Daily Goal) use pickers, not free text.