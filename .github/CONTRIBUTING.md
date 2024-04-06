<div align="center">
    <img src="https://raw.githubusercontent.com/victorfrye/victorfrye/main/images/headstone.svg" alt="headstone" height="64" width="64" />
    <h1>Microsoft Graveyard</h1>
    <p>The virtual graveyard for remembering those killed by Microsoft</p>
</div>

## Contributing Guide

Contributions are welcome and key to maintaining this project! For general features or bugs, please ensure an issue is created before submitting a pull request. If you are simply looking to request a new product be added, please visit [add a new dead product](#adding-a-new-corpse-to-the-graveyard).

### Running the project locally

Microsoft Graveyard is a static web application built utilizing TypeScript, React.js, and Next.js static export, and Node.js. The application is hosted on Azure as a Static Web App. To run the project locally, you will need to have [Node.js](https://nodejs.org/en/download) and [Yarn](https://yarnpkg.com/getting-started/install) installed.

1. Once installed and the repository cloned, you can run the following command from the root of the project to install dependencies:

   ```pwsh
   yarn install
   ```

2. And then you can run the following command to start the development server:

   ```pwsh
   yarn dev
   ```

3. The application will be available at [http://localhost:3000](http://localhost:3000).

### Before opening a pull request

Before opening a pull request, please note the following are required and checked by continuous integration workflow:

1. Ensure your code is formatted by running the following command from the root of the project:

   ```pwsh
   yarn format
   ```

### Adding a new corpse to the graveyard

The core list of dead products is maintained in the [corpses.json](/public/data/corpses.json) file within the `public/data` directory. This file is a JSON array of objects using a custom JSON schema. The schema is defined in the [corpses.schema.json](/files/corpses.schema.json) file but can be summarized as the following properties:

- `name` - The name of the product. This should NOT include Microsoft unless absolutely necessary as all products in this list are Microsoft products and could be prepended with the company's name.

- `qualifier` (OPTIONAL) - A short qualifier for the product. This will be rendered along with the name of the product and should be used to distinguish between products with the same name or a product/service/brand that is still alive or to provide additional context for re-branded products. This should be a single word or prefixed with "fka" (formerly known as) or "aka" (also known as) if applicable.

- `description` - A short description of the product. This should be a single line starting with an article—e.g. "a", "an", or "the"—without sentence casing and should not include the product's name. This will be automatically placed within a sentence by the application when rendered.

- `deathDate` - The date the product was killed. This should be in the format of `YYYY-MM-DD` and should be the date the product was officially killed by Microsoft or the end of life date indicated by Microsoft. If the product was killed multiple times, the most recent date should be used. If the product was significantly changed and re-branded, the date of the prior brand being killed should be used.

- `birthDate` - The date the product was born. This should be in the format of `YYYY-MM-DD` and should be the date the product was officially released by Microsoft. If the product was significantly changed and re-branded, the date of the current brand being released should be used.

- `link` - A link to an article or other source that confirms the product's death. This should be a permalink to the article and not a link to the product's homepage or Microsoft documentation if possible.

## Code of Conduct

Microsoft Graveyard has adopted the [Contributor Covenant Code of Conduct](https://www.contributor-covenant.org/), and we expect project participants to adhere to it. Please read [the full text](/.github/CODE_OF_CONDUCT.md) so that you can understand what actions will and will not be tolerated.
