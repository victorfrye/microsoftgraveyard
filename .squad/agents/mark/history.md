# Mark — History

## Project Context

- **Project:** MicrosoftGraveyard — microsoftgraveyard.com
- **Owner:** Victor Frye (software engineer at Leading EDJE)
- **Description:** Open-source memorial site for discontinued Microsoft products. Deployed as an Azure Static Web App.
- **Stack:** Next.js 16 (static export), React, TypeScript, Fluent UI React v9, Griffel CSS-in-JS, .NET Aspire AppHost (local dev), Terraform (Azure infra), GitHub Actions CI/CD, Biome (lint/format), Jest 30 + Testing Library (unit/component tests)
- **Repo:** `victorfrye/microsoftgraveyard`

## Key Files

- `infra/` — Terraform for Azure (Static Web App, DNS)
- `.github/workflows/` — GitHub Actions: SWA deployment, Terraform plan/apply, CodeQL
- Azure resource: Static Web App + DNS zone

## Commands

```shell
# From infra/
terraform init
terraform fmt -check -recursive
terraform validate
terraform plan
```

## Team

- **Bill** — Lead
- **Anders** — Frontend Dev (TypeScript, React, Fluent UI)
- **Scott** — Backend/.NET Dev (Aspire, .NET CLI)
- **Mark** (me) — DevOps/Infra (Terraform, Azure, CI/CD)
- **Alan** — Tester (Jest, Playwright)
- **Scribe** — Session Logger
- **Ralph** — Work Monitor

## Learnings
