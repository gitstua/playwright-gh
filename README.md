# Purpose
Example Playwright script to login to GitHub

⚠️ It is not recommeded to automate GitHub UI since GitHub can change the format of pages at any time. The best way to automate GitHub is via [REST API](https://docs.github.com/en/rest), [GraphQL](https://docs.github.com/en/graphql) or [GitHub CLI](https://cli.github.com/).

## Usage
There is a GitHub workflow that runs this script on push to main. 

You need to create the follows secrets in your GitHub repo where this workflow is located:
- GH_TOTP This is the 2FA token for of the GitHub machine account. You can get this setup key when you setup 2fa as per the [docs](https://docs.github.com/en/authentication/securing-your-account-with-two-factor-authentication-2fa/configuring-two-factor-authentication#:~:text=QR%20code%2C%20click-,setup%20key,-to%20see%20a).
- GITHUB_USERNAME This is the GitHub username of the machine account.
- GITHUB_PASSWORD This is your GitHub password of the machine account.

## Development
Create a .env file with the following variables:
```
GH_USERNAME=username
GH_PASSWORD=pwd
GH_TOTP=AAAXXXBBBXXXCCCA
```
To run locally, you can use the following command:
```npx playwright test```

## Notes
It is recommended to use a GitHub personal access token instead of your password for interactions with GitHub. 

