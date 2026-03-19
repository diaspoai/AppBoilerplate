# AppBoilerplate — Implementation Plan

> Kaizen approach: each phase is the **smallest viable increment** that is independently committable, testable, and working. No phase depends on a future phase. Each leaves the project in a functional state.

---

## Phase 1 — Git Repo + Monorepo Scaffolding

**Goal:** Empty monorepo that builds and runs Turborepo pipelines.

**Tasks:**
1. Initialize git repo with `.gitignore` (node_modules, .env files, .expo, _generated, .turbo)
2. Create root `package.json` with project name, private: true, scripts
3. Create `pnpm-workspace.yaml` defining `apps/*` and `packages/*`
4. Create `turbo.json` with pipelines: `dev`, `build`, `lint`, `test`
5. Create placeholder `apps/` and `packages/` directories

**Verification:** `pnpm install` succeeds. `turbo build` runs (no-op, no workspaces yet).

**Commit:** `feat: initialize monorepo with Turborepo and pnpm`

---

## Phase 2 — Expo App Initialization

**Goal:** Blank Expo app running inside the monorepo with dev build support.

**Tasks:**
1. Scaffold Expo app in `apps/mobile/` using `create-expo-app` with TypeScript template
2. Add `expo-dev-client` dependency
3. Configure `app.config.ts` (dynamic config replacing static `app.json` fields)
4. Set up `eas.json` with build profiles: development, staging, production
5. Configure `tsconfig.json` with path aliases (`@/` → `src/`)
6. Configure `babel.config.js` with `module-resolver` for path aliases
7. Create `src/app.tsx` as root component (minimal — just a "Hello World" view)
8. Create `index.ts` entry point that registers `app.tsx`
9. Add placeholder `assets/` (icon.png, adaptive-icon.png, splash.png, fonts/)

**Verification:** `pnpm --filter mobile dev` launches Expo dev server. App renders on simulator.

**Commit:** `feat: add Expo app with dev build and path aliases`

---

## Phase 3 — Convex Backend Package

**Goal:** Convex backend initialized with schema and wired to the mobile app.

**Tasks:**
1. Create `packages/backend/package.json` with `convex` dependency
2. Create `packages/backend/tsconfig.json`
3. Initialize Convex: `convex/schema.ts` with `users` and `items` tables
4. Create `convex/_utils/auth.ts` with placeholder auth helper wrappers
5. Create `convex/users/queries.ts` — stub `getUser`
6. Create `convex/users/mutations.ts` — stub `updateProfile`
7. Add `convex` dependency to `apps/mobile/`
8. Wire `ConvexProvider` in `app.tsx` (outermost provider, reads CONVEX_URL from env)

**Verification:** `npx convex dev` starts in `packages/backend/`. Mobile app connects to Convex (provider renders children). Turborepo `dev` pipeline runs both workspaces.

**Commit:** `feat: add Convex backend package with schema and provider`

---

## Phase 4 — ESLint + Prettier

**Goal:** Consistent code style enforced across both workspaces.

**Tasks:**
1. Create root `.eslintrc.js` extending `@react-native`, `prettier`, `plugin:react-hooks`
2. Create root `.prettierrc` with project style rules
3. Add ESLint + Prettier devDependencies to root `package.json`
4. Add `lint` script to both workspace `package.json` files
5. Verify Turborepo `lint` pipeline runs ESLint across all workspaces
6. Fix any existing lint errors in Phase 2–3 code

**Verification:** `turbo lint` passes with zero errors across both workspaces.

**Commit:** `feat: add ESLint and Prettier configuration`

---

## Phase 5 — Environment Management

**Goal:** Typed, tiered environment variable system.

**Tasks:**
1. Create `.env.example` at root documenting all required variables (CONVEX_URL, etc.)
2. Create `.env.development` (gitignored) with local Convex URL
3. Update `app.config.ts` to read `process.env` and expose via `extra`
4. Create `src/shared/env/index.ts` — typed `env` object reading from `Constants.expoConfig.extra`
5. Update `eas.json` build profiles to inject matching `.env.*` files
6. Update `ConvexProvider` in `app.tsx` to use `env.CONVEX_URL`

**Verification:** App reads CONVEX_URL from env. Changing `.env.development` changes the value. TypeScript catches missing env access.

**Commit:** `feat: add environment variable management with typed access`

---

## Phase 6 — Theme System

**Goal:** Dark/light mode with React Navigation theme integration.

**Tasks:**
1. Create `src/shared/theme/colors.ts` — light and dark color palettes
2. Create `src/shared/theme/spacing.ts` — spacing scale
3. Create `src/shared/theme/typography.ts` — font sizes, weights
4. Create `src/shared/theme/ThemeProvider.tsx` — context provider exposing current theme + toggle, maps to React Navigation theme format
5. Add Zustand dependency (needed for next phase, but `useSettingsStore` created here for theme preference persistence with AsyncStorage)
6. Create `src/shared/store/useSettingsStore.ts` — persists `colorScheme` preference
7. Wire `ThemeProvider` into `app.tsx` provider stack (after ConvexProvider)

**Verification:** App renders with light theme. Theme context is accessible. Store persists preference.

**Commit:** `feat: add dark/light theme system with persistence`

---

## Phase 7 — Internationalization

**Goal:** Multi-language support with persistent language selection.

**Tasks:**
1. Add `react-i18next`, `i18next` dependencies to `apps/mobile/`
2. Create `src/shared/i18n/locales/en.json` — English translations (app name, common labels)
3. Create `src/shared/i18n/locales/fr.json` — French translations
4. Create `src/shared/i18n/index.ts` — i18next config with language detector (device locale) and AsyncStorage persistence
5. Extend `useSettingsStore` with `language` preference
6. Wire `I18nextProvider` into `app.tsx` provider stack (after ThemeProvider)
7. Update `app.tsx` "Hello World" to use `useTranslation()` hook

**Verification:** App displays translated text. Changing language persists across restarts.

**Commit:** `feat: add i18n with react-i18next and locale persistence`

---

## Phase 8 — Navigation

**Goal:** Full navigation structure with auth-gated routing.

**Tasks:**
1. Add `@react-navigation/native`, `@react-navigation/stack`, `@react-navigation/bottom-tabs` and peer dependencies
2. Create stub screens: `LoginScreen`, `RegisterScreen`, `HomeScreen`, `ProfileScreen`, `SettingsScreen` (minimal, just screen name + theme-aware styling)
3. Create `src/navigators/AuthNavigator.tsx` — Stack with Login, Register
4. Create `src/navigators/MainNavigator.tsx` — Bottom Tabs with Home, Profile, Settings
5. Create `src/navigators/RootNavigator.tsx` — conditionally renders Auth or Main (hardcoded to Auth for now, auth integration in Phase 9)
6. Create `src/navigators/linking.ts` — deep linking config mapping URL scheme to screens
7. Wire `NavigationContainer` into `app.tsx` with linking config and theme from ThemeProvider
8. Create type definitions for navigation params (`src/navigators/types.ts`)

**Verification:** App shows AuthNavigator with Login/Register. Navigation between screens works. Deep link scheme is registered.

**Commit:** `feat: add React Navigation with auth-gated routing and deep linking`

---

## Phase 9 — Convex Auth Integration

**Goal:** Working authentication flow with Convex Auth.

**Tasks:**
1. Configure `convex/auth.ts` — Convex Auth setup (email/password provider)
2. Create `convex/http.ts` — HTTP router with auth callback routes
3. Update `convex/_utils/auth.ts` — `authenticatedQuery` and `authenticatedMutation` wrappers using Convex Auth helpers
4. Update `convex/users/mutations.ts` — create user record on first auth
5. Add `@convex-dev/auth` and `@auth/core` dependencies to mobile app
6. Replace `ConvexProvider` with `ConvexProviderWithAuth` in `app.tsx`
7. Create `src/shared/store/useAuthStore.ts` — Zustand store caching session info (userId, displayName)
8. Update `RootNavigator.tsx` — check real Convex Auth session state instead of hardcoded value
9. Wire auth actions in `LoginScreen` and `RegisterScreen` (call Convex Auth sign-in/sign-up)

**Verification:** Register → creates user in Convex → navigates to MainNavigator. Login works. Logout returns to AuthNavigator. Session persists across app restarts.

**Commit:** `feat: integrate Convex Auth with login, register, and session persistence`

---

## Phase 10 — Sample CRUD Feature (Items)

**Goal:** Demonstrate Convex queries, mutations, and real-time subscriptions.

**Tasks:**
1. Create `convex/items/queries.ts` — `list` (all items for user), `getById`
2. Create `convex/items/mutations.ts` — `create`, `update`, `delete` (all authenticated)
3. Create `convex/items/subscriptions.ts` — real-time list subscription example
4. Create `src/features/home/components/ItemCard.tsx` — displays a single item
5. Create `src/features/home/components/CreateItemForm.tsx` — form to add an item
6. Update `HomeScreen.tsx` — lists items with real-time updates, add/delete functionality
7. Protect all backend functions with `authenticatedQuery`/`authenticatedMutation` wrappers

**Verification:** Authenticated user can create, view, update, and delete items. Changes appear in real-time (open two simulators or modify via Convex dashboard). Unauthenticated access is rejected.

**Commit:** `feat: add sample CRUD feature with real-time Convex subscriptions`

---

## Phase 11 — Splash Screen

**Goal:** Splash screen that hides after app is ready.

**Tasks:**
1. Add `expo-splash-screen` dependency
2. Configure splash screen in `app.config.ts` (image, background color, resize mode)
3. Add `SplashScreen.preventAutoHideAsync()` in `index.ts`
4. Update `app.tsx` — hide splash screen after all providers are initialized and auth state is resolved
5. Add `assets/splash.png` placeholder image

**Verification:** App shows splash screen on launch. Splash hides smoothly once auth state is determined and navigation is ready.

**Commit:** `feat: add splash screen with auto-hide after initialization`

---

## Phase 12 — Push Notifications

**Goal:** Client-side notification setup with token storage in Convex.

**Tasks:**
1. Add `expo-notifications` and `expo-device` dependencies
2. Create `src/shared/notifications/index.ts`:
   - `registerForPushNotifications()` — requests permission, gets Expo push token
   - `useNotifications()` hook — foreground handler, tap navigation handler
3. Create `convex/users/mutations.ts` — add `savePushToken` mutation
4. Wire `useNotifications` in `app.tsx` (after auth is resolved)
5. Store push token in Convex on registration/login
6. Configure notification channels for Android in `app.config.ts`

**Verification:** App requests notification permission. Token is stored in Convex `users` table. Foreground notifications display correctly.

**Commit:** `feat: add push notification setup with Convex token storage`

---

## Phase 13 — Shared Components

**Goal:** Small set of reusable, theme-aware UI components.

**Tasks:**
1. Create `src/shared/components/Button.tsx` — primary/secondary variants, theme-aware
2. Create `src/shared/components/Input.tsx` — text input with label, error state
3. Create `src/shared/components/Card.tsx` — container with shadow/border
4. Create `src/shared/components/LoadingSpinner.tsx` — activity indicator wrapper
5. Refactor existing screens (Login, Register, Home, etc.) to use shared components

**Verification:** All screens use shared components. Components respond to theme changes (dark/light).

**Commit:** `feat: add shared UI components and refactor screens`

---

## Phase 14 — Unit Testing Setup

**Goal:** Jest configured with sample tests for both workspaces.

**Tasks:**
1. Add `jest`, `@testing-library/react-native`, `@testing-library/jest-native` to `apps/mobile/`
2. Configure `jest.config.ts` in `apps/mobile/` (transform, moduleNameMapper for path aliases, setup file)
3. Create `jest.setup.ts` — mock AsyncStorage, react-native-safe-area-context, navigation
4. Write sample test: `HomeScreen.test.tsx` — renders correctly, displays items
5. Write sample test: `Button.test.tsx` — renders, handles press
6. Add `convex-test` to `packages/backend/`
7. Write sample test: `items/queries.test.ts` — list returns expected items
8. Verify Turborepo `test` pipeline runs both in parallel

**Verification:** `turbo test` passes. Sample tests demonstrate patterns for both mobile and backend.

**Commit:** `feat: add Jest testing setup with sample unit tests`

---

## Phase 15 — E2E Testing (Maestro)

**Goal:** Maestro flows covering auth and core CRUD.

**Tasks:**
1. Create `.maestro/config.yaml` — app ID, device settings
2. Create `.maestro/auth/login.yaml` — launch app, enter credentials, verify home screen
3. Create `.maestro/auth/register.yaml` — register flow, verify navigation
4. Create `.maestro/home/browse-items.yaml` — create item, verify it appears, delete it
5. Add root script: `"test:e2e": "maestro test .maestro/"`

**Verification:** `maestro test .maestro/` passes against running dev build on simulator.

**Commit:** `feat: add Maestro E2E test flows`

---

## Phase 16 — GitHub Actions CI

**Goal:** Automated CI pipeline for PRs and main branch.

**Tasks:**
1. Create `.github/workflows/ci.yml`:
   - Trigger: push to main, pull requests
   - Steps: checkout, setup Node, setup pnpm, install, `turbo lint`, `turbo test`, `turbo build`
   - Cache: pnpm store, Turborepo cache
2. Create `.github/workflows/e2e.yml`:
   - Trigger: `workflow_dispatch` (manual) + cron (nightly)
   - Steps: checkout, setup, build Expo dev client on macOS runner, install Maestro, run flows
3. Add status badges to README (placeholder)

**Verification:** Push to a branch triggers CI. Lint, test, and type-check pass. E2E workflow can be triggered manually.

**Commit:** `feat: add GitHub Actions CI and E2E workflows`

---

## Phase 17 — Profile & Settings Screens

**Goal:** Complete the remaining feature screens with real functionality.

**Tasks:**
1. Update `ProfileScreen.tsx` — display user info from Convex, edit profile (name), call `updateProfile` mutation
2. Update `SettingsScreen.tsx` — theme toggle (dark/light), language selector, logout button
3. Wire settings to `useSettingsStore` and i18n
4. Wire logout to Convex Auth sign-out

**Verification:** Profile shows real user data. Settings changes persist. Logout works and returns to auth flow.

**Commit:** `feat: complete profile and settings screens`

---

## Phase 18 — Documentation & Final Polish

**Goal:** Template repo is ready to clone and use.

**Tasks:**
1. Write `README.md`:
   - Project overview and feature list
   - Prerequisites (Node, pnpm, Expo CLI, Convex CLI, Maestro)
   - Getting started (clone, install, configure Convex, run)
   - Project structure overview
   - Available scripts
   - How to add a new feature (following the pattern)
   - How to remove optional features
   - Environment setup guide
2. Create `.env.example` with all required variables documented
3. Review and clean up all TODO/placeholder comments
4. Ensure all lint and test passes
5. Final `turbo lint && turbo test && turbo build` gate

**Verification:** A new developer can clone the repo, follow the README, and have a running app within minutes. All CI checks pass.

**Commit:** `docs: add README and finalize template for distribution`

---

## Phase Summary

| Phase | Name                     | Depends On | Key Deliverable                        |
| ----- | ------------------------ | ---------- | -------------------------------------- |
| 1     | Monorepo Scaffolding     | —          | Working Turborepo + pnpm workspace     |
| 2     | Expo App                 | 1          | Running Expo dev build                 |
| 3     | Convex Backend           | 1, 2       | Connected Convex backend               |
| 4     | ESLint + Prettier        | 1, 2, 3    | Clean lint pass                        |
| 5     | Environment Mgmt         | 2, 3       | Typed env access, .env tiers           |
| 6     | Theme System             | 2          | Dark/light mode with persistence       |
| 7     | i18n                     | 2, 6       | Multi-language support                 |
| 8     | Navigation               | 2, 6       | Full navigator structure               |
| 9     | Convex Auth              | 3, 8       | Working auth flow                      |
| 10    | Sample CRUD              | 9          | Items feature with real-time           |
| 11    | Splash Screen            | 2, 9       | Smooth app launch experience           |
| 12    | Push Notifications       | 9          | Token registration + foreground        |
| 13    | Shared Components        | 6, 8       | Reusable UI kit                        |
| 14    | Unit Testing             | 10, 13     | Jest + convex-test passing             |
| 15    | E2E Testing              | 10         | Maestro flows passing                  |
| 16    | GitHub Actions           | 14         | CI pipeline running                    |
| 17    | Profile & Settings       | 9, 7, 6    | Complete feature screens               |
| 18    | Documentation            | All        | Ready-to-use template                  |

---

> **Kaizen note:** Each phase follows "make it work → make it clear → make it robust." Phases are ordered so the project is always in a runnable state. No phase introduces dead code or unused infrastructure.
