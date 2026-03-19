# ADR-0013: Template Repo over Interactive CLI

## Status

Accepted

## Context

We needed to decide how developers consume the boilerplate: via an interactive CLI tool (like `create-react-app` or `voltrn-cli`) that scaffolds a project with prompts, or via a template repository that is forked/cloned directly.

## Decision Drivers

* Should minimise maintenance burden (no CLI versioning, publishing, or prompt logic)
* Should allow teams to inspect the full codebase before committing
* Should be forkable and customisable without running a scaffolding tool
* Should support GitHub's template repository feature

## Considered Options

### Option 1: Template Repository (fork/clone)
- **Pros**: Zero tooling to maintain, full codebase visible on GitHub, GitHub "Use this template" button, teams can review all code before adopting, easy to diff against upstream updates
- **Cons**: No interactive customisation (e.g., "Do you want i18n?"), teams must manually delete unused features

### Option 2: Interactive CLI (npx create-app)
- **Pros**: Customised output based on user choices, cleaner initial project (only selected features)
- **Cons**: Significant maintenance burden (CLI code, prompts, template combinations, publishing to npm, versioning), harder to review generated code, can't easily diff against upstream

## Decision

We will ship a **template repository** — developers fork or use GitHub's "Use this template" feature.

## Rationale

A template repo is the lowest-maintenance approach. The boilerplate is a living codebase that can be browsed, reviewed, and forked without any tooling. Teams get the full feature set out of the box and can remove what they don't need. This approach is heavily inspired by [voltrn-cli](https://github.com/IronTony/voltrn-cli), which started as a CLI but whose core value is the template it generates.

The trade-off — no interactive customisation — is acceptable because the boilerplate's feature set (auth, i18n, theming, notifications, CRUD) represents the baseline most production apps need.

## Consequences

### Positive
- Zero maintenance for CLI tooling, npm publishing, or versioning
- Full codebase is reviewable on GitHub before forking
- GitHub "Use this template" provides one-click project creation
- Teams can `git remote add upstream` to pull future boilerplate updates

### Negative
- No interactive feature selection — teams must manually remove unused features
- Renaming the app (bundle ID, app name, etc.) is a manual find-and-replace

## Related Decisions

- [ADR-0008](./0008-svg-first-asset-pipeline.md) — SVG pipeline was inspired by voltrn-cli's approach
