# Product Roadmap

## How to Read This Document

Features are scored using the **RICE framework**:

```
Score = (Reach × Impact × Confidence) / Effort
```

| Factor | Scale |
|--------|-------|
| **Reach** | Users affected per quarter (1–100 scale, where 100 = all users) |
| **Impact** | Massive (3), High (2), Medium (1), Low (0.5), Minimal (0.25) |
| **Confidence** | High (1.0), Medium (0.8), Low (0.5) |
| **Effort** | Person-weeks |

---

## Q1 — Foundation Hardening

> Theme: Make the boilerplate production-ready and trustworthy

| # | Feature | Reach | Impact | Confidence | Effort (pw) | RICE | Priority |
|---|---------|-------|--------|------------|-------------|------|----------|
| 1 | Fix bundle ID mismatch (app.config vs Maestro) | 100 | 3 | 1.0 | 0.5 | **600** | P0 |
| 2 | Complete SettingsScreen (theme/language toggles) | 90 | 2 | 1.0 | 1 | **180** | P0 |
| 3 | Error Boundary component + fallback UI | 80 | 2 | 1.0 | 1 | **160** | P0 |
| 4 | Form validation (react-hook-form + zod) | 85 | 2 | 0.8 | 2 | **68** | P1 |
| 5 | Complete ProfileScreen (display/edit user info) | 70 | 1 | 1.0 | 1.5 | **47** | P1 |
| 6 | Network error handling + offline detection | 75 | 2 | 0.8 | 2 | **60** | P1 |
| 7 | Add testID to all interactive elements | 80 | 1 | 1.0 | 1 | **80** | P1 |
| 8 | CONTRIBUTING.md + SECURITY.md | 60 | 1 | 1.0 | 1 | **60** | P1 |

### Q1 Outcomes

- [ ] All Maestro E2E tests pass with correct bundle IDs
- [ ] Settings screen exposes theme and language toggles
- [ ] App recovers gracefully from render errors instead of crashing
- [ ] Auth forms validate email format and password strength
- [ ] Profile screen displays and edits user name

---

## Q2 — Developer Experience & Robustness

> Theme: Make the boilerplate a joy to develop with and extend

| # | Feature | Reach | Impact | Confidence | Effort (pw) | RICE | Priority |
|---|---------|-------|--------|------------|-------------|------|----------|
| 9 | Shared UI component library (Button, Input, Card) | 90 | 2 | 0.8 | 3 | **48** | P1 |
| 10 | Error tracking integration (Sentry scaffold) | 70 | 2 | 0.8 | 2 | **56** | P1 |
| 11 | Android CI + E2E in GitHub Actions | 60 | 2 | 0.8 | 2.5 | **38** | P2 |
| 12 | Onboarding/welcome flow (first-launch screens) | 50 | 1 | 0.8 | 2 | **20** | P2 |
| 13 | Password visibility toggle on auth screens | 90 | 0.5 | 1.0 | 0.5 | **90** | P1 |
| 14 | Pull-to-refresh on HomeScreen | 80 | 0.5 | 1.0 | 0.5 | **80** | P1 |
| 15 | Accessibility audit + screen reader labels | 60 | 1 | 0.8 | 2 | **24** | P2 |

### Q2 Outcomes

- [ ] Reusable `<Button>`, `<TextInput>`, `<Card>` components in `shared/components/`
- [ ] Sentry scaffold wired with environment-based DSN
- [ ] Android E2E runs nightly alongside iOS
- [ ] Auth screens have password visibility toggle
- [ ] HomeScreen supports pull-to-refresh

---

## Q3 — Growth & Polish

> Theme: Attract adopters and polish the developer experience

| # | Feature | Reach | Impact | Confidence | Effort (pw) | RICE | Priority |
|---|---------|-------|--------|------------|-------------|------|----------|
| 16 | Bottom tab icons (SF Symbols / Material Icons) | 90 | 1 | 1.0 | 1 | **90** | P1 |
| 17 | Forgot password flow (email reset) | 70 | 1 | 0.8 | 2 | **28** | P2 |
| 18 | OAuth provider examples (Google, Apple) | 60 | 2 | 0.5 | 3 | **20** | P2 |
| 19 | RTL layout support for i18n | 30 | 1 | 0.8 | 2 | **12** | P3 |
| 20 | Push notification deep navigation on tap | 80 | 1 | 0.8 | 1.5 | **43** | P1 |
| 21 | Performance monitoring scaffold | 40 | 1 | 0.5 | 2 | **10** | P3 |
| 22 | Storybook for shared components | 40 | 1 | 0.5 | 3 | **7** | P3 |

### Q3 Outcomes

- [ ] Bottom tabs have icons, not just text labels
- [ ] Notification taps navigate to the correct screen
- [ ] At least one OAuth provider documented and scaffolded
- [ ] Forgot password flow works end-to-end

---

## Backlog (Unprioritised)

| Feature | Notes |
|---------|-------|
| Biometric auth (Face ID / fingerprint) | Requires `expo-local-authentication` |
| In-app purchases scaffold | Platform-specific, high complexity |
| Animations library (Reanimated) | Nice-to-have for polish |
| Swipe-to-delete on items | Requires gesture handler |
| Search/filter on HomeScreen | Useful for CRUD demo |
| Dark mode per-screen override | Edge case |
| CI build time optimisation | Profile first, optimise later |
| EAS Update (OTA) documentation | Partially covered in README |

---

## MoSCoW Summary

| Must Have (Q1) | Should Have (Q2) | Could Have (Q3) | Won't Have (now) |
|----------------|------------------|------------------|-------------------|
| Bundle ID fix | Shared components | OAuth examples | In-app purchases |
| Settings UI | Sentry scaffold | Tab icons | Biometric auth |
| Error boundary | Android CI | Forgot password | Animations library |
| Form validation | Password toggle | RTL support | Storybook |
| Profile screen | Pull-to-refresh | Push deep nav | |
| Network errors | Accessibility | Perf monitoring | |
| testIDs | Onboarding flow | | |
| CONTRIBUTING.md | | | |
