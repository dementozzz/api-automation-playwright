# Playwright API & WEB Automation testing project

This repository contains API & WEB automation tests built with `Playwright` and `TypeScript` using [Contact list app website](https://thinking-tester-contact-list.herokuapp.com/).
The tests are executed via GitHub Actions.

## Overview

A comprehensive testing framework that
- Combines API & E2E testing in one solution
- Integrated with CI/CD pipelines and automated reporting systems.

## :pushpin: Table of Contents
- [Installation](#installation)
- [Create an account](#create-an-account)
- [How to run test](#how-to-run-test)
- [Setting up with github action](#setting-up-with-github-action)
- [Integration with Slack](#integration-with-slack)


## Installation

**Clone the repository:**

```bash
git clone https://github.com/dementozzz/e2e-playwright-test.git
``` 

**Navigate to project directory:**

```bash
cd e2e-playwright-test
```

**Install dependencies:**

```bash
npm ci
```

## Create an account

To smoothen the automation process, an account is required. You can use the credential below:

| Username | Password |
|:----------|:----------|
| usr1@gmail.com | usr123456 |

 Or if you prefer use your own account, you can register an account [here](https://thinking-tester-contact-list.herokuapp.com/addUser)
 
## How to run test



### Before you run test

Make sure you create .env file in your project folder that contain your credential information from previous step. You can use the value below:

```bash
EMAIL=<your-email>
PASSWORD=<your-password>
```
### Execute test

#### API Test:

```bash
npx playwright test --project=api --headed
```

#### Web Testing:

```
npx playwright test --project=web --headed
```

## Setting up with github action

You have to create repository secrets that contain your username and password of your website testing.

| Name | Secret |
|:----------|:----------|
| DB_EMAIL | *your-email* |
| DB_PASSWORD | *your-password* |

You can check the documentation of how to add repository secret [here](https://docs.github.com/en/actions/security-for-github-actions/security-guides/using-secrets-in-github-actions).

## Integration with Slack

### Setting up with Slack app

To enable sending message using Slack, first you need to create [Slack App](https://api.slack.com/apps). After that make sure you are:

- Allow Incoming webhook
- Webhook is added on your Slack app
- Add `incoming-webhook` as OAuth scope under Bot token Scopes

Read the documentation of [Sending Message using Webhook](https://api.slack.com/messaging/webhooks) for more information.

### Github action configuration

After you done setting up Slack webhook, you can obtain your webhook url under Incoming webhook menu, Then you can add it to your github secret. 

| Name | Secret |
|:----------|:----------|
| SLACK_WEBHOOK_URL | *your-slack-webhook-url* |
| SLACK_CHANNEL_ID | *your-slack-channel-id* |
