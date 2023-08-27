import { test, expect } from '@playwright/test';

test('test org list', async ({ page }) => {
  await page.goto('https://github.com/');
  await page.getByLabel('Open user account menu').click();
  await page.getByRole('link', { name: 'Your organizations' }).click();
  //await page.waitForLoadState();
  var innerHTML = await page.locator('turbo-frame').filter({hasText: 'Organizations' }).innerHTML();
  //await expect(innerHTML).toContain('Organizations');

  var text = await page.locator('turbo-frame').allTextContents() || '';

  await page.locator('turbo-frame').filter({hasText: 'Organizations' })
    .screenshot({ path: './playwright-images/org-list.png' });

  await test.info().annotations.push(
    {
      type: "organizations",
      description: innerHTML,
    },
    {
      type: "organizations text",
      description: text.join(', \n'),
    }
  );

  //request usage report
  // await page.getByRole('button', { name: 'Get usage report' }).click();
  // await page.getByRole('button', { name: 'Send report to email' }).click();
});

