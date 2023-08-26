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

