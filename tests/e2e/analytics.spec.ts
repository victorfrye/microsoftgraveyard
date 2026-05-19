import { test, expect } from '@playwright/test';

test.describe('Analytics', () => {
  test.beforeEach(async ({ page }) => {
    // Set consent to allow analytics and advertising
    await page.addInitScript(() => {
      localStorage.setItem('consent', JSON.stringify({ analytics: true, advertising: true }));
    });
  });

  test('GA4 script tag is present in the document', async ({ page }) => {
    await page.goto('/');
    const gtagScript = page.locator('script#gtag');
    await expect(gtagScript).toBeAttached();
  });

  test('GA4 script loads from googletagmanager.com', async ({ page }) => {
    await page.goto('/');
    const gtagScript = page.locator('script[src*="googletagmanager.com"]');
    await expect(gtagScript).toBeAttached();
  });

  test('GA4 makes an outbound network request to googletagmanager.com', async ({ page }) => {
    let gtmRequestFired = false;

    page.on('request', (request) => {
      if (request.url().includes('googletagmanager.com')) {
        gtmRequestFired = true;
      }
    });

    await page.goto('/');
    await page.waitForTimeout(3000); // Allow scripts to load and fire

    expect(gtmRequestFired).toBe(true);
  });

  test('Microsoft Clarity is initialized on the page', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(2000); // Allow Clarity SDK to initialize

    const clarityDefined = await page.evaluate(() => {
      return typeof (window as Window & { clarity?: unknown }).clarity !== 'undefined';
    });

    expect(clarityDefined).toBe(true);
  });

  test('Microsoft Clarity makes an outbound network request', async ({ page }) => {
    let clarityRequestFired = false;

    page.on('request', (request) => {
      if (request.url().includes('clarity.ms') || request.url().includes('c.bing.com')) {
        clarityRequestFired = true;
      }
    });

    await page.goto('/');
    await page.waitForTimeout(3000); // Allow Clarity to load and fire

    expect(clarityRequestFired).toBe(true);
  });
});
