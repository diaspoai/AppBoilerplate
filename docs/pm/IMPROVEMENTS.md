# Improvement Proposals

This document details every identified gap in the boilerplate, organised by category. Each improvement includes context, expected impact, and implementation guidance.

---

## Critical (P0) — Must fix before recommending the boilerplate

### IMP-001: Fix Bundle ID Mismatch

**Problem**: `app.config.ts` defines `com.appboilerplate.app` as the bundle identifier, but Maestro E2E files reference `com.appboilerplate.mobile`. E2E tests will fail to launch the app.

**Fix**: Align Maestro files to match `app.config.ts`:
```yaml
# .maestro/auth/login.yaml, register.yaml, home/browse-items.yaml
appId: com.appboilerplate.app    # was: com.appboilerplate.mobile
```

**Effort**: 10 minutes | **Impact**: E2E tests actually work

---

### IMP-002: Complete SettingsScreen with Theme & Language Toggles

**Problem**: `useSettingsStore` exposes `colorScheme` and `language` setters, `ThemeProvider` and `I18nProvider` consume them — but the SettingsScreen only shows a sign-out button. Users have no way to change theme or language from the UI.

**Expected implementation**:
- Theme picker: Light / Dark / System (three-option segmented control)
- Language picker: English / Français (list or dropdown)
- Both persist via Zustand + AsyncStorage (already wired)

**Effort**: 1 week | **Impact**: Completes a core boilerplate feature

---

### IMP-003: Add Error Boundary Component

**Problem**: No Error Boundary exists. If any screen throws during rendering, the entire app crashes with no recovery path.

**Expected implementation**:
- `shared/components/ErrorBoundary.tsx` wrapping feature screens
- Fallback UI with "Something went wrong" message and "Try Again" button
- Error logged (prepare for Sentry integration later)

**Effort**: 1 week | **Impact**: App survives render errors gracefully

---

## High Priority (P1) — Important for production readiness

### IMP-004: Form Validation with react-hook-form + zod

**Problem**: Auth forms only check `if (!email || !password) return` — no email format validation, no password strength rules, no field-level error messages.

**Expected implementation**:
- Install `react-hook-form` + `zod` (or `yup`)
- Login schema: valid email, non-empty password
- Register schema: valid email, password min 8 chars with strength indicator, confirm password
- Field-level error messages displayed inline
- i18n-compatible error messages

**Effort**: 2 weeks | **Impact**: Auth UX goes from prototype to production quality

---

### IMP-005: Complete ProfileScreen

**Problem**: ProfileScreen only renders the title "Profile" — no user data displayed or editable.

**Expected implementation**:
- Display authenticated user's name and email (from Convex `users` table)
- Edit display name (mutation to `userProfiles`)
- Avatar placeholder (prepare for image upload later)
- Account creation date

**Effort**: 1.5 weeks | **Impact**: Completes a core navigation tab

---

### IMP-006: Network Error Handling & Offline Detection

**Problem**: No offline detection, no error states on queries, no retry logic. If the user loses connectivity, the app shows a loading spinner forever.

**Expected implementation**:
- Install `expo-network` or use `NetInfo`
- `useNetworkStatus()` hook in `shared/`
- Offline banner component shown when disconnected
- Query error states in HomeScreen (show error + retry button instead of infinite spinner)
- Convex client handles reconnection automatically, but UI should reflect state

**Effort**: 2 weeks | **Impact**: App behaves correctly without internet

---

### IMP-007: Add testID Props to All Interactive Elements

**Problem**: Most inputs and buttons lack `testID`, making Maestro and RNTL tests fragile (relying on text matching instead of stable IDs).

**Affected screens**:
- LoginScreen: email input, password input, submit button, register link
- RegisterScreen: same pattern
- HomeScreen: new item input, add button, item checkboxes, delete buttons
- SettingsScreen: sign-out button
- ProfileScreen: (once implemented)

**Effort**: 1 week | **Impact**: Tests become stable and maintainable

---

### IMP-008: Shared UI Component Library

**Problem**: Every screen re-implements Button, TextInput, and card-like containers with inline styles. No consistent design tokens applied via reusable components.

**Expected implementation**:
```
src/shared/components/
├── Button.tsx           # Primary, secondary, destructive variants
├── TextInput.tsx        # Themed, with label, error message, optional icon
├── Card.tsx             # Elevated surface container
├── Divider.tsx          # Horizontal rule
├── ScreenContainer.tsx  # SafeArea + scroll + padding wrapper
└── index.ts             # Barrel export
```

**Effort**: 3 weeks | **Impact**: Consistent UI, faster feature development

---

### IMP-009: Error Tracking Scaffold (Sentry)

**Problem**: No error reporting. Crashes in production are invisible.

**Expected implementation**:
- Install `@sentry/react-native`
- Wrap app with `Sentry.wrap()`
- Environment-based DSN (dev/staging/prod)
- Error Boundary reports to Sentry
- Source maps uploaded during EAS Build (documented, not wired)

**Effort**: 2 weeks | **Impact**: Production errors become visible and actionable

---

### IMP-010: Password Visibility Toggle

**Problem**: No way to see what you're typing in password fields. Common UX expectation.

**Fix**: Add an eye icon toggle that switches `secureTextEntry` on/off.

**Effort**: 0.5 weeks | **Impact**: Small but expected UX improvement

---

### IMP-011: Pull-to-Refresh on HomeScreen

**Problem**: FlatList has no refresh control. Users expect pull-to-refresh on list screens.

**Fix**: Add `refreshing` + `onRefresh` props to FlatList. Convex re-queries automatically, but the gesture gives a sense of control.

**Effort**: 0.5 weeks | **Impact**: Meets user expectation on list screens

---

## Medium Priority (P2) — Robustness and polish

### IMP-012: Android CI + E2E Testing

**Problem**: CI only runs E2E on iOS Simulator. Android has no build or test coverage.

**Expected implementation**:
- Add Android job to `e2e.yml` using `reactivecircus/android-emulator-runner`
- Build APK via `expo prebuild --platform android` + `./gradlew assembleDebug`
- Run Maestro flows on Android emulator
- Runs nightly alongside iOS

**Effort**: 2.5 weeks | **Impact**: Android regressions caught automatically

---

### IMP-013: Onboarding / Welcome Flow

**Problem**: No first-launch experience. New users land directly on login with no context.

**Expected implementation**:
- `useSettingsStore` tracks `hasSeenOnboarding: boolean`
- 3-screen carousel: "Real-time data", "Secure auth", "Your app, your way"
- Skip button + "Get Started" CTA
- Only shown once (persisted)

**Effort**: 2 weeks | **Impact**: Better first impression for end users

---

### IMP-014: Accessibility Audit

**Problem**: Most interactive elements lack `accessibilityLabel`, `accessibilityHint`, and `accessibilityRole`. Screen reader users cannot navigate the app.

**Expected implementation**:
- Audit every screen with VoiceOver (iOS) and TalkBack (Android)
- Add `accessibilityLabel` to all buttons and inputs
- Add `accessibilityHint` for non-obvious interactions
- Add `accessibilityRole` where needed
- Document accessibility testing in CONTRIBUTING.md

**Effort**: 2 weeks | **Impact**: App is usable by screen reader users

---

### IMP-015: Bottom Tab Icons

**Problem**: Tab bar shows text labels only — no icons. Every production app uses icons.

**Expected implementation**:
- Use `@expo/vector-icons` (already bundled with Expo)
- Home → `Ionicons/home`
- Profile → `Ionicons/person`
- Settings → `Ionicons/settings`
- Active/inactive tint colours from theme

**Effort**: 1 week | **Impact**: App looks professional

---

## Low Priority (P3) — Nice-to-have

### IMP-016: Forgot Password Flow

Implement email-based password reset using Convex Auth's verification system.

### IMP-017: OAuth Provider Examples

Document and scaffold Google Sign-In and Apple Sign-In as optional providers.

### IMP-018: RTL Layout Support

Add RTL detection for Arabic/Hebrew locales. React Native supports `I18nManager.forceRTL()`.

### IMP-019: Push Notification Deep Navigation

When user taps a notification with `data: { screen: 'home' }`, navigate to that screen using the response listener in `useNotifications`.

### IMP-020: Performance Monitoring

Scaffold `expo-performance` or custom timing hooks to track screen render times.

---

## Summary by Effort

```
< 1 day    : IMP-001 (bundle ID fix)
< 1 week   : IMP-010 (password toggle), IMP-011 (pull-to-refresh),
              IMP-015 (tab icons)
1–2 weeks  : IMP-002 (settings UI), IMP-003 (error boundary),
              IMP-005 (profile), IMP-007 (testIDs), IMP-008 (components)
2–3 weeks  : IMP-004 (form validation), IMP-006 (offline),
              IMP-009 (Sentry), IMP-012 (Android CI),
              IMP-013 (onboarding), IMP-014 (accessibility)
```
