import { test, expect } from '@playwright/test';

import OTPAuth from 'otpauth';

// load .env file
require('dotenv').config()

test('test', async ({ page }) => {

  //get env variable GH_TOTP
  await Login(page);

  await page.getByRole('link', { name: 'Your organizations' }).click();
  await page.getByRole('link', { name: 'Enterprises' }).click();
  await page.locator('#settings-frame').getByRole('link', { name: 'Settings' }).click();

  //request usage report
  // await page.getByRole('button', { name: 'Get usage report' }).click();
  // await page.getByRole('button', { name: 'Send report to email' }).click();
});

async function Login(page) {
  const secret_gh_totp = process.env.GH_TOTP;

  // generate a new totp instance
  let totp = new OTPAuth.TOTP({
    issuer: "GitHub",
    label: "USERNAME",
    algorithm: "SHA1",
    digits: 6,
    period: 30,
    secret: secret_gh_totp
  });

  const totptoken = totp.generate();
  const userName = process.env.GH_USERNAME || '';
  const password = process.env.GH_PASSWORD || '';

  // open page and login
  await page.goto('https://github.com/');
  await page.getByRole('link', { name: 'Sign in' }).click();
  await page.getByLabel('Password').click();
  await page.getByLabel('UserName').fill(userName);
  await page.getByLabel('Password').fill(password);
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.getByPlaceholder('XXXXXX').click();

  //fill in totp token
  await page.getByPlaceholder('XXXXXX').fill(totptoken);
  await page.getByLabel('Open user account menu').click();
}

