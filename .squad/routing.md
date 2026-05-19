# Work Routing

How to decide who handles what.

## Routing Table

| Work Type | Route To | Examples |
|-----------|----------|----------|
| Architecture, scope, decisions | Bill | What to build, trade-offs, code review, PR approvals |
| React components, Fluent UI, Next.js, TypeScript | Anders | Headstone, layout, styling, client components, type design |
| .NET Aspire, .NET CLI, backend services | Scott | AppHost orchestration, service wiring, .NET integration |
| Azure infra, Terraform, CI/CD, deployment | Mark | Static Web App, DNS, GitHub Actions workflows |
| Jest tests, Playwright, quality gates | Alan | Unit tests, component tests, E2E tests, coverage |
| Code review | Bill | Review PRs, check quality, architectural concerns |
| Testing | Alan | Write tests, find edge cases, verify fixes |
| Scope & priorities | Bill | What to build next, trade-offs, decisions |
| Session logging | Scribe | Automatic — never needs routing |

## Issue Routing

| Label | Action | Who |
|-------|--------|-----|
| `squad` | Triage: analyze issue, assign `squad:{member}` label | Bill |
| `squad:bill` | Architecture, scope, review work | Bill |
| `squad:anders` | Frontend, React, TypeScript component work | Anders |
| `squad:scott` | .NET, Aspire, backend integration | Scott |
| `squad:mark` | Azure, Terraform, CI/CD, infra | Mark |
| `squad:alan` | Tests, quality, Playwright | Alan |

### How Issue Assignment Works

1. When a GitHub issue gets the `squad` label, **Bill** triages it — analyzing content, assigning the right `squad:{member}` label, and commenting with triage notes.
2. When a `squad:{member}` label is applied, that member picks up the issue in their next session.
3. Members can reassign by removing their label and adding another member's label.
4. The `squad` label is the "inbox" — untriaged issues waiting for Bill's review.

## Rules

1. **Eager by default** — spawn all agents who could usefully start work, including anticipatory downstream work.
2. **Scribe always runs** after substantial work, always as `mode: "background"`. Never blocks.
3. **Quick facts → coordinator answers directly.** Don't spawn an agent for "what port does the server run on?"
4. **When two agents could handle it**, pick the one whose domain is the primary concern.
5. **"Team, ..." → fan-out.** Spawn all relevant agents in parallel as `mode: "background"`.
6. **Anticipate downstream work.** If a feature is being built, spawn the tester to write test cases from requirements simultaneously.
7. **Issue-labeled work** — when a `squad:{member}` label is applied to an issue, route to that member. The Lead handles all `squad` (base label) triage.
