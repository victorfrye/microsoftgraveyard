# Agent Instructions

This document provides context for AI coding agents working in this repository.

## Architecture

This is a monorepo for [microsoftgraveyard.com](https://microsoftgraveyard.com), an open-source memorial site for discontinued Microsoft products, deployed as an Azure Static Web App.

- **`src/WebClient/`** — Next.js 16 React app with static export (`output: 'export'`). This is the actual website. No SSR or API routes — all pages are statically generated.
- **`src/AppHost/`** — .NET Aspire AppHost (net10.0) that orchestrates local development. It runs the WebClient via `AddJavaScriptApp` with npm. Not deployed.
- **`infra/`** — Terraform for Azure infrastructure (Static Web App, DNS).
- **`.github/workflows/`** — GitHub Actions CI/CD: SWA deployment, Terraform plan/apply, CodeQL.

### UI Stack

- **Fluent UI React v9** (`@fluentui/react-components`) for all UI components
- **Griffel** (`makeStyles`) for CSS-in-JS styling — no CSS modules or Tailwind

### Graveyard Feature

- `corpses.json` — JSON data file listing all discontinued Microsoft products with name, qualifier, birthDate, deathDate, description, and link
- `use-corpse.ts` — Core business logic: age calculation (years/months/days), obituary generation, life dates formatting
- `use-corpses-document.ts` — Loads and sorts corpses from JSON by deathDate descending
- `headstone.tsx` — Card component rendering skeleton (loading) or headstone content (loaded) for each product

## Commands

All web commands run from `src/WebClient/`:

```shell
npm run dev          # Start Next.js dev server (Turbopack)
npm run build        # Static export build (uses webpack via --webpack flag)
npm run lint         # Biome check (lint + format)
npm run lint:fix     # Biome check with auto-fix
npm run lint:ci      # Biome CI mode (used in GitHub Actions)
npm run test         # Jest unit tests
npm run test:coverage # Jest with coverage (80% threshold, runs in CI)
npm run knip         # Dead code/dependency detection (local only)
```

Aspire orchestrated development (primary way to run locally, from repo root):

```shell
aspire run
```

Infrastructure (from `infra/`):

```shell
terraform init
terraform fmt -check -recursive
terraform validate
terraform plan
```

### Testing

- **Jest 30** with `@testing-library/react` for unit and component tests
- Run tests: `npm run test` — Run with coverage: `npm run test:coverage`
- Coverage threshold: 80% across statements, branches, functions, and lines
- Test files are colocated side-by-side with source (e.g., `headstone.test.tsx` next to `headstone.tsx`)
- Shared test utilities in `test-utils.tsx` — import via `@test-utils` alias for `renderWithProviders`

## Conventions

### Project Structure

Feature-based directory organization under `src/WebClient/app/`. Each feature directory (e.g., `graveyard/`, `shell/`, `theme/`, `privacy/`, `storage/`) uses:

- **Barrel exports** via `index.ts` for public API
- **`strings.ts`** files for static UI strings — do not inline user-facing text in components

### TypeScript / React

- Path alias `@/*` maps to `./app/*` — use it for all imports within the app
- `'use client'` directive on interactive components; pages and layouts are server components by default
- Provider tree in `provider-tree.tsx` composes context providers (Consent → ColorMode → Theme)
- Interfaces preferred over type aliases for component props (e.g., `interface HeadstoneProps`)

### Formatting and Linting

- **Biome** for both linting and formatting (not ESLint/Prettier)
- Single quotes for JavaScript/TypeScript strings
- 2-space indent for web files (JS, TS, JSON, MD, CSS, HTML)
- 4-space indent for C# files
- LF line endings for web files; CRLF for C# files
- EditorConfig is the source of truth for indent/line-ending rules

### Git

- Trunk-based development on `main` with short-lived PR branches
- Conventional commits with feature scopes: `feat(graveyard):`, `fix(shell):`, `chore(infra):`, etc.
- Scopes map to feature areas: `graveyard`, `shell`, `theme`, `privacy`, `analytics`, `infra`, `apphost`

### Maintaining This File

When introducing architectural changes or new features, update this `AGENTS.md` file to keep future sessions informed.
