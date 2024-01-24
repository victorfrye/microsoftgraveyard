<div align="center">
    <img src="https://raw.githubusercontent.com/victorfrye/victorfrye/main/images/headstone.svg" alt="headstone" style="height: 64px; width: 64px; padding: 0 20px;"/>
    <h1>Microsoft Graveyard</h1>
    <p>The virtual graveyard for all products killed by Microsoft.</p>
</div>

## Contributing Guide

### Adding a product to the graveyard

The core list of dead products is maintained in the [corpses.json](/src/Client/wwwroot/data/corpses.json) file. This file is a JSON array of objects with the following a custom JSON schema. The schema is defined in the [corpses.schema.json](/files/corpses.schema.json) file but can be summarized as the following properties:

- `name` - The name of the product. This should NOT include Microsoft unless absolutely necessary as all products in this list are Microsoft products and could be prepended with the company's name.

- `subtitle` (OPTIONAL) - A short qualifier for the product. This will be rendered along with the name of the product and should be used to distinguish between products with the same name or a product/service/brand that is still alive. For example, the original Xbox console is dead but the Xbox brand is still alive. The subtitle for the original Xbox should be "original console" to distinguish it from the Xbox brand. This also can be used to highlight well known aliases or re-branded names for the product prefixed with the abbreviations "aka" or "fka".

- `description` - A short description of the product. This should be a single line without sentence casing and should not include the product's name. This will be automatically placed within a sentence by the application when rendered.

- `deathDate` - The date the product was killed. This should be in the format of `YYYY-MM-DD` and should be the date the product was officially killed by Microsoft or the end of life date indicated by Microsoft. If the product was killed multiple times, the most recent date should be used. If the product was significantly changed and re-branded, the date of the prior brand being killed should be used.

- `birthDate` - The date the product was born. This should be in the format of `YYYY-MM-DD` and should be the date the product was officially released by Microsoft. If the product was significantly changed and re-branded, the date of the current brand being released should be used.

- `link` - A link to an article or other source that confirms the product's death. This should be a permalink to the article and not a link to the site's homepage or Microsoft documentation if possible.

- `slug` - A unique slug for the product. This should be a lowercase, hyphenated version of the product's name. If the product's name is changed, the slug should be updated to match the new name.

## Code of Conduct

Microsoft Graveyard has adopted the [Contributor Covenant Code of Conduct](https://www.contributor-covenant.org/), and we expect project participants to adhere to it. Please read [the full text](/.github/CODE_OF_CONDUCT.md) so that you can understand what actions will and will not be tolerated.
