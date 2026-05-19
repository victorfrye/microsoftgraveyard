import { test, expect } from '@playwright/test';

test.describe('Shell', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('consent', JSON.stringify({ analytics: true, advertising: true }));
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
    await expect(page.getByText(new RegExp(`© Victor Frye ${year}`))).toBeVisible();
  });

  test('GitHub social link is present with correct href', async ({ page }) => {
    const link = page.locator('a[href="https://github.com/victorfrye/microsoftgraveyard"]');
    await expect(link).toBeAttached();
  });

  test('Threads social link is present with correct href', async ({ page }) => {
    const link = page.locator('a[href="https://www.threads.com/@microsoftgraveyard"]');
    await expect(link).toBeAttached();
  });

  test('scroll FAB is visible before reaching page bottom', async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(300);

    // Verify at least one fixed-position button is visible on the page
    const fabVisible = await page.evaluate(() => {
      const buttons = document.querySelectorAll('button');
      for (const btn of buttons) {
        const style = window.getComputedStyle(btn);
        if (style.position === 'fixed' && style.opacity === '1') {
          return true;
        }
      }
      return false;
    });
    expect(fabVisible).toBe(true);
  });

  test('clicking scroll FAB scrolls to the bottom', async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(300);

    // Click the first visible fixed-position button (the scroll-down FAB)
    await page.evaluate(() => {
      const buttons = document.querySelectorAll('button');
      for (const btn of buttons) {
        const style = window.getComputedStyle(btn);
        if (style.position === 'fixed' && style.opacity === '1') {
          (btn as HTMLButtonElement).click();
          return;
        }
      }
    });

    await page.waitForTimeout(1500); // Wait for smooth scroll to complete

    const isAtBottom = await page.evaluate(() => {
      return (window.scrollY + window.innerHeight) >= document.documentElement.scrollHeight - 150;
    });

    expect(isAtBottom).toBe(true);
  });
});
