import { test, expect } from '@playwright/test';

test.describe('App', () => {
  test('loads and displays the page title', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Microsoft Graveyard/);
  });

  test('renders the graveyard main element', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('main#graveyard')).toBeVisible();
  });
});
