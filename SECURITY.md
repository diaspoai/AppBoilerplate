# Security Policy

## Supported Versions

| Version | Supported |
|---------|-----------|
| Latest `main` | Yes |
| Older commits | No |

This is a template repository. Security fixes are applied to `main` only. Forks are responsible for pulling updates.

---

## Reporting a Vulnerability

If you discover a security vulnerability in this boilerplate, **do not open a public issue**.

Instead, report it privately:

1. **Email**: Send details to the repository maintainers (check the repo owner's profile for contact info)
2. **GitHub Security Advisories**: Use GitHub's [private vulnerability reporting](https://docs.github.com/en/code-security/security-advisories/guidance-on-reporting-and-writing-information-about-vulnerabilities/privately-reporting-a-security-vulnerability) feature

Include:
- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if you have one)

We will acknowledge receipt within **48 hours** and provide a fix timeline within **7 days**.

---

## Security Architecture

### Authentication

- **Provider**: Convex Auth (`@convex-dev/auth`) with the Password provider
- **Session storage**: Convex database (`authSessions` table) + client-side `AsyncStorage`
- **Session management**: JWT-based, keys stored in Convex environment variables (`JWT_PRIVATE_KEY`, `JWKS`)
- **Rate limiting**: Built-in via Convex Auth's `authRateLimits` table (automatic, no configuration required)

### Authorization

- Every backend query and mutation that accesses user data calls `requireAuthUserId(ctx)`
- Ownership checks: mutations verify `item.userId === userId` before modifying data
- Internal queries/actions use `internalQuery` / `internalAction` — not callable from clients

### Data Security

- All Convex communication uses HTTPS (TLS 1.2+)
- Self-hosted Convex: ensure your Docker deployment terminates TLS at a reverse proxy
- No sensitive data is stored in client-side AsyncStorage (only session tokens and user preferences)
- Environment variables (`.env.*`) are gitignored — never committed

### Secrets Management

| Secret | Where it lives | Who manages it |
|--------|---------------|----------------|
| `JWT_PRIVATE_KEY` | Convex dashboard / env vars | Convex Auth (`npx @convex-dev/auth`) |
| `JWKS` | Convex dashboard / env vars | Convex Auth |
| `CONVEX_SELF_HOSTED_ADMIN_KEY` | `packages/backend/.env.local` (gitignored) | Developer |
| `EXPO_TOKEN` | GitHub Actions secrets | Repository admin |
| `EAS_PROJECT_ID` | `.env.{APP_ENV}` (gitignored) | Developer |

### What NOT to Commit

These files are gitignored for a reason:

```
.env.development          # Real environment values
.env.staging
.env.production
packages/backend/.env.local   # Self-hosted admin key
config/master.key         # (if using Rails-style encryption)
*.p8 / *.p12              # APNs push certificates
google-services.json      # Firebase config (if added later)
```

---

## Security Checklist for Forked Projects

When you fork this boilerplate for your own app, review these items:

### Before First Deploy

- [ ] Run `npx @convex-dev/auth` to generate unique JWT keys for your deployment
- [ ] Verify `.env.*` files are gitignored (check `git status` after creating them)
- [ ] Set `SITE_URL` in Convex dashboard if using OAuth
- [ ] Review Convex Auth rate limits in the dashboard
- [ ] If self-hosting: place Convex behind a reverse proxy with TLS termination

### Ongoing

- [ ] Keep Expo SDK and Convex updated (security patches)
- [ ] Review `pnpm audit` output periodically
- [ ] Monitor Convex Auth's `authRateLimits` table for abuse patterns
- [ ] Add Sentry or equivalent for error tracking (see [IMP-009](docs/pm/IMPROVEMENTS.md#imp-009-error-tracking-scaffold-sentry))

### If Adding OAuth

- [ ] Store OAuth client secrets in Convex environment variables (never in code)
- [ ] Restrict OAuth redirect URIs to your domain only
- [ ] Enable PKCE for mobile OAuth flows

### If Adding Payments

- [ ] Use Convex actions (server-side) for payment API calls — never call payment APIs from the client
- [ ] Validate webhook signatures server-side
- [ ] Log all payment events for audit trail

---

## Dependencies

This project uses automated dependency scanning via GitHub's Dependabot (if enabled on your fork). Key dependencies with security implications:

| Package | Role | Security Notes |
|---------|------|---------------|
| `convex` | Backend runtime | Handles data validation and access control |
| `@convex-dev/auth` | Authentication | Manages sessions, password hashing, rate limiting |
| `expo-notifications` | Push notifications | Token management, Expo Push API relay |
| `@react-native-async-storage/async-storage` | Local persistence | Stores session tokens — encrypted at rest on iOS (Keychain-backed), not encrypted on Android by default |
| `expo-secure-store` | **(Not yet installed)** | Recommended for storing sensitive tokens on Android. Consider migrating session storage from AsyncStorage to SecureStore for production apps. |

---

## Known Limitations

1. **AsyncStorage on Android is not encrypted by default** — Consider `expo-secure-store` for sensitive data in production
2. **No CAPTCHA on registration** — Rely on Convex Auth rate limiting for abuse prevention
3. **No email verification flow** — Convex Auth supports it but it's not wired in the boilerplate
4. **Push token stored in plaintext** — Expo push tokens are not secrets, but review if your notification payload contains sensitive data
