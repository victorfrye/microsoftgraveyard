# Alan — History

## Project Context

- **Project:** MicrosoftGraveyard — microsoftgraveyard.com
- **Owner:** Victor Frye (software engineer at Leading EDJE)
- **Description:** Open-source memorial site for discontinued Microsoft products. Deployed as an Azure Static Web App.
- **Stack:** Next.js 16 (static export), React, TypeScript, Fluent UI React v9, Griffel CSS-in-JS, .NET Aspire AppHost (local dev), Terraform (Azure infra), GitHub Actions CI/CD, Biome (lint/format), Jest 30 + Testing Library (unit/component tests)
- **Repo:** `victorfrye/microsoftgraveyard`

## Key Files

- `src/WebClient/test-utils.tsx` — `renderWithProviders` helper (`@test-utils` alias)
- `src/WebClient/jest.config.ts` — Jest config
- `src/WebClient/app/graveyard/headstone.test.tsx` — Example test colocated with source
- Coverage threshold: 80% statements, branches, functions, lines

## Commands

```shell
# From src/WebClient/
npm run test              # Run Jest tests
npm run test:coverage     # Run with coverage (80% threshold — fails if below)
```

## Team

- **Bill** — Lead
- **Anders** — Frontend Dev (TypeScript, React, Fluent UI)
- **Scott** — Backend/.NET Dev (Aspire, .NET CLI)
- **Mark** — DevOps/Infra (Terraform, Azure, CI/CD)
- **Alan** (me) — Tester (Jest, Playwright)
- **Scribe** — Session Logger
- **Ralph** — Work Monitor

## Learnings
