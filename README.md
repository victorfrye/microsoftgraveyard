# Microsoft Graveyard

The virtual graveyard for remembering those killed by Microsoft

[![Azure Static Web Apps CI/CD](https://github.com/victorfrye/microsoftgraveyard/actions/workflows/azure-swa.yml/badge.svg)](https://github.com/victorfrye/microsoftgraveyard/actions/workflows/azure-swa.yml)
[![CodeQL](https://github.com/victorfrye/microsoftgraveyard/actions/workflows/github-code-scanning/codeql/badge.svg)](https://github.com/victorfrye/microsoftgraveyard/actions/workflows/github-code-scanning/codeql)
[![GitHub Issues](https://img.shields.io/github/issues/victorfrye/microsoftgraveyard)](https://github.com/victorfrye/microsoftgraveyard/issues)
[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](/.github/CODE_OF_CONDUCT.md)
[![MIT license](https://img.shields.io/badge/License-MIT-blue.svg)](/LICENSE)

## Overview

Microsoft Graveyard is an open-source static web application that serves as a virtual graveyard for remembering those killed by Microsoft. The project was inspired by [Killed By Google](https://killedbygoogle.com/) with a mission to enable users to:

📚 Learn about the history of Microsoft products and services.

🌐 Explore the graveyard and remember products you may have forgotten.

🪦 Help maintain the collection by contributing to the project.

## Table of Contents

- [Overview](#overview)
- [Table of Contents](#table-of-contents)
- [Contributing](#contributing)
  - [Request a headstone](#request-a-headstone)
- [Get Started](#get-started)
  - [Prerequisites](#prerequisites)
  - [.NET Aspire](#net-aspire)
  - [Clone the repo](#clone-the-repo)
  - [Run the app](#run-the-app)
- [Corpse Document](#corpse-document)  
- [Code of Conduct](#code-of-conduct)
- [License](#license)

## Contributing

Contributions are welcome and key to maintaining this project! Please read the [contributing guide](/.github/CONTRIBUTING.md) for opening issues or pull requests. If you are simply looking to request a new product be added, continuing reading for how to [add a new dead product](#add-a-new-dead-product).

### Request a headstone

To request a headstone be added to the graveyard for a missing product killed by Microsoft, please open a [new dead product issue](https://github.com/victorfrye/microsoftgraveyard/issues/new?assignees=victorfrye&labels=%F0%9F%92%80+Issue-Corpse%2C%F0%9F%AA%A6+Area-Graveyard&projects=&template=1_new_dead_product.md) and add the relevant information.

If you're looking to contribute directly, Please read our the [Get Started](#get-started) documentation for more information including how to run the project and add data to the existing collection of products.

## Get Started

### Prerequisites

To run this project, you will need to have the following software installed on your machine:

- [Git](https://git-scm.com/downloads)
- [Node.js](https://nodejs.org/en/download/)
- An IDE or text editor of your choice
  - [e.g., Visual Studio Code](https://code.visualstudio.com/download)

Optionally, you can also use the .NET Aspire application host to run the project. This is not required but does add additional local development features. For these optional features, you will need the following additional software installed:

- [.NET 9 SDK](https://dotnet.microsoft.com/en-us/download)
- An OCI compliant container runtime
  - [e.g., Docker Desktop](https://www.docker.com/get-started/)

### .NET Aspire

This project optionally uses .NET Aspire to orchestrate the local development environment. This will be expanded upon in the future to add additional features include OpenTelemetry and other backing cloud services.

For more information on or troubleshooting .NET Aspire, see the [Aspire documentation](https://learn.microsoft.com/en-us/dotnet/aspire/get-started/aspire-overview).

### Clone the repo

To clone the repository, run the following command in your terminal:

```pwsh
git clone https://github.com/victorfrye/microsoftgraveyard.git
```

### Run the app

To run the application, simply run the following commands in the root of the project:

```pwsh
Set-Location .\src\WebClient; npm install; npm run dev
```

## Corpse Document

The core list of dead products is maintained in the [corpses.json](./src/WebClient/app/data/corpses.json) file within the `src/WebClient/app/data/` directory. The document contains an array of objects using a custom JSON schema. The schema is defined in the [corpses.schema.json](/files/corpses.schema.json) file but can be summarized as the following properties:

- `name` - The name of the product. This should NOT include Microsoft unless absolutely necessary as all products in this list are Microsoft products and could be prepended with the company's name.

- `qualifier` (OPTIONAL) - A short qualifier for the product. This will be rendered along with the name of the product and should be used to distinguish between products with the same name or a product/service/brand that is still alive or to provide additional context for re-branded products. This should be a single word or prefixed with "fka" (formerly known as) or "aka" (also known as) if applicable.

- `description` - A short description of the product. This should be a single line starting with an article—e.g. "a", "an", or "the"—without sentence casing and should not include the product's name. This will be automatically placed within a sentence by the application when rendered.

- `birthDate` - The date the product was born. This should be in the format of `YYYY-MM-DD` and should be the date the product was officially released by Microsoft. If the product was significantly changed and re-branded, the date of the current brand being released should be used.

- `deathDate` - The date the product was killed. This should be in the format of `YYYY-MM-DD` and should be the date the product was officially killed by Microsoft or the end of life date indicated by Microsoft. If the product was killed multiple times, the most recent date should be used. If the product was significantly changed and re-branded, the date of the prior brand being killed should be used.

- `link` - A link to an article or other source that confirms the product's death. This should be a permalink to the article and not a link to the product's homepage or Microsoft documentation if possible.

## Code of Conduct

Microsoft Graveyard has adopted the [Contributor Covenant Code of Conduct](https://www.contributor-covenant.org/), and we expect project participants to adhere to it. Please read [the full text](/.github/CODE_OF_CONDUCT.md) so that you can understand what actions will and will not be tolerated.

## License

Copyright (c) Victor Frye. All rights reserved.

Licensed under the [MIT](/LICENSE) license.
