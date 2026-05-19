import { test, expect } from '@playwright/test';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const corpseData = JSON.parse(
  readFileSync(join(__dirname, '../../src/WebClient/app/graveyard/corpses.json'), 'utf-8')
);
const EXPECTED_COUNT: number = corpseData.corpses.length;

test.describe('Graveyard', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('consent', JSON.stringify({ analytics: true, advertising: true }));
    });
  });

  test(`renders all ${EXPECTED_COUNT} corpse cards`, async ({ page }) => {
    await page.goto('/');
    // Fluent UI Card renders as <article> in the DOM
    const cards = page.locator('main#graveyard article');
    await expect(cards).toHaveCount(EXPECTED_COUNT, { timeout: 15000 });
  });
});
