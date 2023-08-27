import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
const enterpriseName = 'stucorp';

  await page.goto(`https://github.com/enterprises/${enterpriseName}/security/risk`);
  await page.screenshot({ path: `./playwright-images/ent-${enterpriseName}-security-risk.png`, fullPage: true });

  await page.goto(`https://github.com/enterprises/${enterpriseName}/security/coverage`);
  await page.screenshot({ path: `./playwright-images/ent-${enterpriseName}-security-coverage.png`, fullPage: true });

  await page.goto(`https://github.com/enterprises/${enterpriseName}/settings/billing`);
  await page.screenshot({ path: `./playwright-images/ent-${enterpriseName}-settings-billing.png`, fullPage: true });

});