# Getting Started

## Installation

After you've cloned the project, run `yarn install` from the project root.

> yarn install

## Development

### Start The App with Serverless Functions

To get started, you can start **App with Serverless Functions** by running:

> yarn start

This command starts a [Netlify Local Server](https://docs.netlify.com/cli/get-started/#run-a-local-development-environment)

### Start Storybook

**To develop components**, you can start Storybook.

> yarn storybook

### Start The App Only

To develop **app only**, you can start Create React App .

> yarn app

### Invoke Serverless Functions

To invoke a [local Netlify Functions](https://github.com/netlify/cli/blob/master/docs/netlify-dev.md#netlify-functions):
> yarn start

Then, open a new terminal, run
> yarn invoke

## Build

Before starting the app, packages needs to be built.

> yarn build

Note: If you've made changes to `./packages`, rerun `yarn build` to see the latest changes.

## Quality Assurance

### Testing

To run all tests

> yarn test

### Formatting Code

> yarn format

### Linting Code

> yarn lint

### Checking Code Size

> yarn size

## Continuous Integrations

To Simulate Continuous Integrations

> yarn ci

## Continuous Delivery

To Simulate Continuous Delivery

> yarn cd