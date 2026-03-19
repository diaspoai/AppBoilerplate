# Feature Success Metrics

How to measure whether each feature in the boilerplate delivers value. These metrics apply to **apps built from this template**, not the template itself.

---

## Metric Framework

For each feature, we track:

| Dimension | Question |
|-----------|----------|
| **Adoption** | What % of forked projects keep this feature enabled? |
| **Frequency** | How often do end users interact with it? |
| **Depth** | What % of the feature's capability is used? |
| **Retention** | Do users continue engaging over time? |
| **Satisfaction** | Do developers find it well-implemented? |

---

## Auth (Convex Auth)

| Metric | Definition | Target |
|--------|-----------|--------|
| Sign-up completion rate | # completed registrations / # started | > 80% |
| Sign-in success rate | # successful logins / # attempts | > 95% |
| Auth error rate | # auth errors / # total auth actions | < 2% |
| Session duration | Time between sign-in and sign-out/expiry | Track baseline |
| Time to first auth | Seconds from app open to authenticated state | < 30s (new user) |

---

## Real-Time Data (Convex Queries)

| Metric | Definition | Target |
|--------|-----------|--------|
| Query latency (P50/P95) | Time from query subscription to first result | P50 < 200ms |
| Live update latency | Time from mutation to UI re-render on other clients | < 500ms |
| Items created per user | Average items created in first session | > 1 |
| CRUD completion rate | % of users who create, read, update, AND delete | > 50% (demo) |

---

## Navigation

| Metric | Definition | Target |
|--------|-----------|--------|
| Tab switch frequency | Tab changes per session | Track baseline |
| Deep link success rate | # deep links resolved / # attempted | > 95% |
| Navigation error rate | # navigation errors / # navigation actions | < 0.1% |
| Screen time distribution | % of session time per screen | Track baseline |

---

## Theming

| Metric | Definition | Target |
|--------|-----------|--------|
| Theme override rate | % of users who change from system default | Track |
| Dark mode adoption | % of users on dark theme | Track |
| Theme persistence success | % of app launches with correct persisted theme | 100% |

---

## i18n

| Metric | Definition | Target |
|--------|-----------|--------|
| Language override rate | % of users who change from device locale | Track |
| Missing translation rate | # untranslated keys / # total keys | 0% |
| Locale detection accuracy | % of users whose detected locale matches preference | > 95% |

---

## Push Notifications

| Metric | Definition | Target |
|--------|-----------|--------|
| Permission grant rate | # granted / # prompted | > 60% |
| Token registration success | # tokens saved / # permission grants | > 99% |
| Delivery rate | # delivered / # sent | > 95% |
| Tap-through rate | # notifications tapped / # delivered | > 15% |
| Opt-out rate | # users disabling after granting / # total granted | < 10% |

---

## Testing (Developer Metrics)

| Metric | Definition | Target |
|--------|-----------|--------|
| Test pass rate | % of tests passing in CI | 100% |
| Test execution time | Total `pnpm turbo test` duration | < 60s |
| Code coverage (mobile) | % of statements covered by Jest | > 60% |
| Code coverage (backend) | % of statements covered by Vitest | > 80% |
| E2E pass rate | % of Maestro flows passing | 100% |
| Flaky test rate | % of tests that fail intermittently | < 2% |

---

## CI/CD (Developer Metrics)

| Metric | Definition | Target |
|--------|-----------|--------|
| CI pass rate | % of PR checks passing | > 95% |
| CI duration | Time from push to green check | < 5 min |
| E2E duration | Nightly E2E workflow total time | < 30 min |
| Mean time to fix CI | Time from CI failure to green | < 2 hours |

---

## Developer Satisfaction (Template Metrics)

Track via GitHub issues, stars, and periodic surveys:

| Metric | Definition | Target |
|--------|-----------|--------|
| GitHub stars | Total stars | Track growth |
| Fork count | Total forks | Track growth |
| Issue resolution time | Median time from open to close | < 7 days |
| Setup success rate | % of issues tagged "setup" / total forks | < 5% |
| NPS (if surveyed) | "How likely to recommend this template?" | > 50 |

---

## Funnel: Fork to Feature

```
Fork/Clone → Install → Backend Running → App on Simulator → First Custom Screen → Deployed
```

| Step | Metric | Target |
|------|--------|--------|
| Fork → Install | % who successfully run `pnpm install` | > 98% |
| Install → Backend | % who get Convex running (Docker or Cloud) | > 90% |
| Backend → Simulator | % who see the app on device/simulator | > 85% |
| Simulator → Custom Screen | % who add their own screen within 24h | > 50% |
| Custom Screen → Deployed | % who deploy to TestFlight/Play Store | Track |
