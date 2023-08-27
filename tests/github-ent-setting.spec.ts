import { test, expect } from '@playwright/test';

test('test getting enterprise settings', async ({ page }) => {
  await page.goto('https://github.com/');
  await page.getByLabel('Open user account menu').click();
  await page.getByRole('link', { name: 'Your organizations' }).click();
  await page.getByRole('link', { name: 'Enterprises' }).click();
  await page.locator('#settings-frame').getByRole('link', { name: 'Settings' }).click();

  //request usage report
  // await page.getByRole('button', { name: 'Get usage report' }).click();
  // await page.getByRole('button', { name: 'Send report to email' }).click();
});
