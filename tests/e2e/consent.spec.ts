import { test, expect } from '@playwright/test';

test.describe('Cookie Consent', () => {
  test.beforeEach(async ({ page }) => {
    // Ensure fresh state — no consent cached
    await page.addInitScript(() => {
      localStorage.removeItem('consent');
    });
  });

  test('consent dialog appears when no consent is cached', async ({ page }) => {
    await page.goto('/');
    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible({ timeout: 5000 });
  });

  test('accept all stores analytics:true and advertising:true in localStorage', async ({ page }) => {
    await page.goto('/');

    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible({ timeout: 5000 });

    const acceptButton = page.getByRole('button', { name: /accept/i }).first();
    await acceptButton.click();

    const consent = await page.evaluate(() => {
      const raw = localStorage.getItem('consent');
      return raw ? JSON.parse(raw) : null;
    });

    expect(consent).toEqual({ analytics: true, advertising: true });
  });

  test('reject all stores analytics:false and advertising:false in localStorage', async ({ page }) => {
    await page.goto('/');

    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible({ timeout: 5000 });

    const rejectButton = page.getByRole('button', { name: /reject/i }).first();
    await rejectButton.click();

    const consent = await page.evaluate(() => {
      const raw = localStorage.getItem('consent');
      return raw ? JSON.parse(raw) : null;
    });

    expect(consent).toEqual({ analytics: false, advertising: false });
  });

  test('cookie FAB is visible after consent is given', async ({ page }) => {
    await page.goto('/');

    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible({ timeout: 5000 });

    const acceptButton = page.getByRole('button', { name: /accept/i }).first();
    await acceptButton.click();

    // After consent, the cookie FAB (fixed-position, right-aligned) should be present
    const fabVisible = await page.evaluate(() => {
      const buttons = document.querySelectorAll('button');
      for (const btn of buttons) {
        const style = window.getComputedStyle(btn);
        if (style.position === 'fixed' && style.right !== '' && style.right !== 'auto') {
          return true;
        }
      }
      return false;
    });

    expect(fabVisible).toBe(true);
  });

  test('clicking cookie FAB opens the consent manager dialog', async ({ page }) => {
    // Start with consent already set so the FAB is shown immediately
    await page.addInitScript(() => {
      localStorage.setItem('consent', JSON.stringify({ analytics: true, advertising: true }));
    });
    await page.goto('/');

    // Click the cookie FAB (fixed-position, right-aligned button)
    await page.evaluate(() => {
      const buttons = document.querySelectorAll('button');
      for (const btn of buttons) {
        const style = window.getComputedStyle(btn);
        if (style.position === 'fixed' && style.right !== '' && style.right !== 'auto') {
          (btn as HTMLButtonElement).click();
          return;
        }
      }
    });

    await expect(page.getByRole('dialog')).toBeVisible({ timeout: 3000 });
  });
});
