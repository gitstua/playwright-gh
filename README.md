# Purpose
Example Playwright script to login to GitHub

⚠️ It is not recommeded to automate GitHub UI since GitHub can change the format of pages at any time. The best way to automate GitHub is via [REST API](https://docs.github.com/en/rest), [GraphQL](https://docs.github.com/en/graphql) or [GitHub CLI](https://cli.github.com/).

## Usage
There is a GitHub workflow that runs this script on push to main. 

You need to create the following Actions secrets in your GitHub repo where this workflow is located:
- GH_TOTP This is the 2FA token for of the GitHub [machine user](https://docs.github.com/en/get-started/learning-about-github/types-of-github-accounts#:~:text=is%20called%20a-,machine%20user,-.%20For%20example%2C%20you). You can get this setup key when you setup 2fa as per the [docs](https://docs.github.com/en/authentication/securing-your-account-with-two-factor-authentication-2fa/configuring-two-factor-authentication#:~:text=QR%20code%2C%20click-,setup%20key,-to%20see%20a).
- GITHUB_USERNAME This is the GitHub username of the machine user.
- GITHUB_PASSWORD This is your GitHub password of the machine user.

## Development
Create a .env file with the following variables:
```
GH_USERNAME=username
GH_PASSWORD=pwd
GH_TOTP=AAAXXXBBBXXXCCCA
```

To run locally, you can use the [Playwright extension for VSCode](https://playwright.dev/docs/getting-started-vscode) or the following command:
```npx playwright test```

## Recording new playwright scripts
You can record tests as per these [instructions](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright#record-new-tests)

## Notes
It is recommended to use a GitHub personal access token instead of your password for interactions with GitHub. 

