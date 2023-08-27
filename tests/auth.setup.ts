import { test as setup, expect } from '@playwright/test';
import OTPAuth from 'otpauth';

const authFile = 'playwright/.auth/user.json';

require('dotenv').config();

setup('authenticate', async ({ page }) => {
    
    // get environment variables
    const secret_gh_totp = process.env.GH_TOTP;
    const userName = process.env.GH_USERNAME || '';
    const password = process.env.GH_PASSWORD || '';

    if (!secret_gh_totp) {
    throw new Error('GH_TOTP is not set as environment variable in .env file or as Actions secret ');
    }
    if (!userName) {
    throw new Error('GH_USERNAME is not set as environment variable in .env file or as Actions secret ');
    }
    if (!password) {
    throw new Error('GH_PASSWORD is not set as environment variable in .env file or as Actions secret ');
    }

    // create a new totp instance and generate a token
    let totp = new OTPAuth.TOTP({
    issuer: "GitHub",
    label: "USERNAME",
    algorithm: "SHA1",
    digits: 6,
    period: 30,
    secret: secret_gh_totp
    });
    const totptoken = totp.generate();

    // open page and login
    await page.goto('https://github.com/login');
    await page.getByLabel('UserName').fill(userName);
    await page.getByLabel('Password').fill(password);
    await page.getByRole('button', { name: 'Sign in' }).click();
    await page.getByPlaceholder('XXXXXX').click();

    //fill in totp token
    await page.getByPlaceholder('XXXXXX').fill(totptoken);
    // await page.getByLabel('Open user account menu').click();

  // Sometimes login flow sets cookies in the process of several redirects.
  // Wait for the final URL to ensure that the cookies are actually set.
  await page.waitForURL('https://github.com/');
  // Alternatively, you can wait until the page reaches a state where all cookies are set.
  //await expect(page.getByRole('button', { name: 'View profile and more' })).toBeVisible();

  // End of authentication steps.

  await page.context().storageState({ path: authFile });
});