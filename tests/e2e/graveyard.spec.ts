import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { expect, test } from '@playwright/test';

const __dirname = dirname(fileURLToPath(import.meta.url));
const corpseData = JSON.parse(
  readFileSync(
    join(__dirname, '../../src/WebClient/app/graveyard/corpses.json'),
    'utf-8',
  ),
);
const EXPECTED_COUNT: number = corpseData.corpses.length;

test.describe('Graveyard', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem(
        'consent',
        JSON.stringify({ analytics: true, advertising: true }),
      );
    });
  });

  test(`renders all ${EXPECTED_COUNT} corpse cards`, async ({ page }) => {
    await page.goto('/');
    // Corpses are loaded client-side via useEffect; wait for all cards to mount
    const cards = page.locator('[data-testid="headstone"]');
    await expect(cards).toHaveCount(EXPECTED_COUNT, { timeout: 30000 });
  });
});
