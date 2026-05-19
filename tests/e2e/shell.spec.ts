import { expect, test } from '@playwright/test';

test.describe('Shell', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem(
        'consent',
        JSON.stringify({ analytics: true, advertising: true }),
      );
    });
    await page.goto('/');
  });

  test('footer is visible', async ({ page }) => {
    await expect(page.locator('footer')).toBeVisible();
  });

  test('footer displays "Made with 💙 by Victor Frye"', async ({ page }) => {
    await expect(page.getByText('Made with 💙 by Victor Frye')).toBeVisible();
  });

  test('footer displays the correct copyright year', async ({ page }) => {
    const year = new Date().getFullYear().toString();
    await expect(
      page.getByText(new RegExp(`© Victor Frye ${year}`)),
    ).toBeVisible();
  });

  test('GitHub social link is present with correct href', async ({ page }) => {
    const link = page.locator(
      'a[href="https://github.com/victorfrye/microsoftgraveyard"]',
    );
    await expect(link).toBeAttached();
  });

  test('Threads social link is present with correct href', async ({ page }) => {
    const link = page.locator(
      'a[href="https://www.threads.com/@microsoftgraveyard"]',
    );
    await expect(link).toBeAttached();
  });

  test('scroll FAB is visible before reaching page bottom', async ({
    page,
  }) => {
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(300);

    const scrollFab = page.locator('[data-testid="scroll-fab"]');
    await expect(scrollFab).toBeVisible();
  });

  test('clicking scroll FAB scrolls to the bottom', async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(300);

    await page.locator('[data-testid="scroll-fab"]').click();
    await page.waitForTimeout(1500); // Wait for smooth scroll to complete

    const isAtBottom = await page.evaluate(() => {
      return (
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - 150
      );
    });

    expect(isAtBottom).toBe(true);
  });
});
