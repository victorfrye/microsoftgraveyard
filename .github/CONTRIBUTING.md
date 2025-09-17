# Contributing Guidelines

Welcome and thank you for your interest in contributing to Microsoft Graveyard!

This document outlines the guidelines for contributing to the project. By following these guidelines, you can help ensure a smooth and efficient collaboration process.

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Code of Conduct](#code-of-conduct)
- [Issues](#issues)
- [Code](#code)
  - [Corpses Document](#corpses-document)
  - [Get Started](#get-started)
  - [Clone Repository](#clone-repository)
  - [Run Application](#run-application)

## Code of Conduct

Microsoft Graveyard has adopted the [Contributor Covenant Code of Conduct](https://www.contributor-covenant.org/), and we expect project participants to adhere to it. Please read [the full text](./CODE_OF_CONDUCT.md) so that you can understand what actions will and will not be tolerated.

## Issues

The project uses GitHub Issues to track graveyard corpses, bug reports, and feature requests. When creating a new issue, please use the appropriate issue template and provide as much detail as possible. The amount of detail provided directly impacts the speed at which issues are able to be prioritized and resolved.

The current issue templates are:

- [New Corpse](./ISSUE_TEMPLATE/1_new_corpse.md): Request a new corpse to be added to the graveyard.
- [Bug Report](./ISSUE_TEMPLATE/2_bug_report.md): Report a bug in the project.
- [Feature Request](./ISSUE_TEMPLATE/3_feature_request.md): Request a new feature for the project.

## Code

The core of the project is a static web application built using [Next.js](https://nextjs.org/). The project also uses [Aspire](https://dotnet.microsoft.com/apps/cloud) for developer environment orchestration and Bicep for infrastructure as code.

### Corpses Document

Most code contributions are to the [Corpses document](../src/WebClient/app/graveyard/corpses.json) located in `src/WebClient/app/graveyard/corpses.json`. This document is a custom JSON schema that contains the complete list of dead Microsoft products rendered in the graveyard. The schema is defined in the [corpses.schema.json](../files/corpses.schema.json) file but can be summarized as the following properties:

- `name`: The name of the product.
- `qualifier`: A short qualifier for the product to prevent duplicate entries (optional).
- `description`: A short description of the product.
- `birthDate`: The date the product was released.
- `deathDate`: The date the product was killed.
- `link`: A link to an article or other source that confirms the product's death.

### Get Started

For all other code contributions, you will need to use GitHub Codespaces or have the following prerequisites installed on your machine:

- [Git](https://git-scm.com/downloads)
- [Node.js LTS](https://nodejs.org/en/download/)
- [.NET 9 SDK](https://dotnet.microsoft.com/download/dotnet/9.0)
- An OCI runtime, e.g.:
  - [Docker Desktop](https://www.docker.com/products/docker-desktop)
  - [Podman](https://podman.io/)
  - For more information, see [Container runtime](https://learn.microsoft.com/en-us/dotnet/aspire/fundamentals/setup-tooling#container-runtime)
- An IDE or code editor, e.g.:
  - [Visual Studio](https://visualstudio.microsoft.com/vs/)
  - [Visual Studio Code](https://code.visualstudio.com/)
  - [JetBrains Rider](https://www.jetbrains.com/rider/)
  - [JetBrains WebStorm](https://www.jetbrains.com/webstorm/)

[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://github.com/codespaces/new?hide_repo_select=true&ref=main&repo=696807378)

### Clone Repository

To clone the repository, run the following command in your terminal:

```pwsh
git clone https://github.com/victorfrye/microsoftgraveyard.git
```

### Run Application

To run the application, simply run the following commands in the root of the project:

```pwsh
dotnet run --project ./src/AppHost/AppHost.csproj
```
