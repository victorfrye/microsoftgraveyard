import { expect, test } from '@playwright/test';

test.describe('Cookie Consent', () => {
  // Ensure each test starts with completely clean storage state (no consent cached)
  test.use({ storageState: { cookies: [], origins: [] } });

  test('consent dialog appears when no consent is cached', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('dialog')).toBeVisible({ timeout: 10000 });
  });

  test('accept all stores analytics:true and advertising:true in localStorage', async ({
    page,
  }) => {
    await page.goto('/');
    await expect(page.getByRole('dialog')).toBeVisible({ timeout: 10000 });

    await page.getByRole('button', { name: 'Accept all' }).click();

    const consent = await page.evaluate(() => {
      const raw = localStorage.getItem('consent');
      return raw ? JSON.parse(raw) : null;
    });

    expect(consent).toEqual({ analytics: true, advertising: true });
  });

  test('reject all stores analytics:false and advertising:false in localStorage', async ({
    page,
  }) => {
    await page.goto('/');
    await expect(page.getByRole('dialog')).toBeVisible({ timeout: 10000 });

    await page.getByRole('button', { name: 'Reject unnecessary' }).click();

    const consent = await page.evaluate(() => {
      const raw = localStorage.getItem('consent');
      return raw ? JSON.parse(raw) : null;
    });

    expect(consent).toEqual({ analytics: false, advertising: false });
  });

  test('cookie FAB is visible after consent is given', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('dialog')).toBeVisible({ timeout: 10000 });

    await page.getByRole('button', { name: 'Accept all' }).click();

    await expect(page.locator('[data-testid="cookie-fab"]')).toBeVisible();
  });

  test('clicking cookie FAB opens the consent manager dialog', async ({
    page,
  }) => {
    // Pre-set consent so the FAB is shown immediately (no dialog on load)
    await page.addInitScript(() => {
      localStorage.setItem(
        'consent',
        JSON.stringify({ analytics: true, advertising: true }),
      );
    });
    await page.goto('/');

    await page.locator('[data-testid="cookie-fab"]').click();

    await expect(page.getByRole('dialog')).toBeVisible({ timeout: 5000 });
  });
});
