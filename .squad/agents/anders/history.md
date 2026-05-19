# Anders — History

## Project Context

- **Project:** MicrosoftGraveyard — microsoftgraveyard.com
- **Owner:** Victor Frye (software engineer at Leading EDJE)
- **Description:** Open-source memorial site for discontinued Microsoft products. Deployed as an Azure Static Web App.
- **Stack:** Next.js 16 (static export), React, TypeScript, Fluent UI React v9, Griffel CSS-in-JS, .NET Aspire AppHost (local dev), Terraform (Azure infra), GitHub Actions CI/CD, Biome (lint/format), Jest 30 + Testing Library (unit/component tests)
- **Repo:** `victorfrye/microsoftgraveyard`

## Key Files

- `src/WebClient/app/` — Feature directories: graveyard/, shell/, theme/, privacy/, storage/
- `src/WebClient/app/graveyard/headstone.tsx` — Card component for each discontinued product
- `src/WebClient/app/graveyard/use-corpse.ts` — Core business logic: age calc, obituary, life dates
- `src/WebClient/app/graveyard/use-corpses-document.ts` — Loads/sorts corpses from JSON
- `src/WebClient/app/graveyard/corpses.json` — Product data
- `src/WebClient/app/provider-tree.tsx` — Context provider composition
- `src/WebClient/test-utils.tsx` — `renderWithProviders` shared test util (`@test-utils` alias)

## Team

- **Bill** — Lead
- **Anders** (me) — Frontend Dev (TypeScript, React, Fluent UI)
- **Scott** — Backend/.NET Dev (Aspire, .NET CLI)
- **Mark** — DevOps/Infra (Terraform, Azure, CI/CD)
- **Alan** — Tester (Jest, Playwright)
- **Scribe** — Session Logger
- **Ralph** — Work Monitor

## Learnings
