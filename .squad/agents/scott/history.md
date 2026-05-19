# Scott — History

## Project Context

- **Project:** MicrosoftGraveyard — microsoftgraveyard.com
- **Owner:** Victor Frye (software engineer at Leading EDJE)
- **Description:** Open-source memorial site for discontinued Microsoft products. Deployed as an Azure Static Web App.
- **Stack:** Next.js 16 (static export), React, TypeScript, Fluent UI React v9, Griffel CSS-in-JS, .NET Aspire AppHost (local dev), Terraform (Azure infra), GitHub Actions CI/CD, Biome (lint/format), Jest 30 + Testing Library (unit/component tests)
- **Repo:** `victorfrye/microsoftgraveyard`

## Key Files

- `src/AppHost/` — .NET Aspire AppHost (net10.0), orchestrates WebClient via `AddJavaScriptApp`
- `src/AppHost/Program.cs` — Entry point for Aspire orchestration
- `src/WebClient/` — Next.js frontend (run via `npm run dev` in Aspire)

## Commands

```shell
aspire run          # Start AppHost + WebClient (from repo root)
dotnet build        # Build AppHost
```

## Team

- **Bill** — Lead
- **Anders** — Frontend Dev (TypeScript, React, Fluent UI)
- **Scott** (me) — Backend/.NET Dev (Aspire, .NET CLI)
- **Mark** — DevOps/Infra (Terraform, Azure, CI/CD)
- **Alan** — Tester (Jest, Playwright)
- **Scribe** — Session Logger
- **Ralph** — Work Monitor

## Learnings
