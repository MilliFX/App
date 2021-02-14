# MilliFX App

[![CircleCI](https://circleci.com/bb/millifx/app.svg?style=svg&circle-token=44a3e372915cf1eece9ae25c18e25db1df49e6ac)](https://app.circleci.com/pipelines/bitbucket/millifx/app)
[![Storybook](https://cdn.jsdelivr.net/gh/storybookjs/brand@master/badge/badge-storybook.svg)](https://millifx.netlify.app/storybook/index.html)
<a href="https://twitter.com/intent/follow?screen_name=millifx">
<img src="https://badgen.net/twitter/follow/millifx?icon=twitter&label=%40millifx" alt="Official Twitter Handle" />
</a>

React Application which showcases InvestmentPerformance.

[Production](https://app.millifx.com) [![Netlify Status](https://api.netlify.com/api/v1/badges/89f54884-5339-49bc-ad32-c6a96750ce4c/deploy-status)](https://app.netlify.com/sites/millifx/deploys)
| [Staging ](https://app-stg.millifx.com) [![Netlify Status](https://api.netlify.com/api/v1/badges/c5d4bb2c-5cb5-43c3-b92f-d36f52666b10/deploy-status)](https://app.netlify.com/sites/millifx-stg/deploys)
| [UI Library](https://app.millifx.com/storybook/index.html) | [UI Docs](https://app.millifx.com/docs/index.html) | [Bundle Explorer](https://app.millifx.com/explorer.html) | [Tech Stacks](app/docs/STACK.md)

This project was created with [Yarn Workspace](https://classic.yarnpkg.com/en/docs/workspaces/).

# Mono Repo

This app is structured as mono repo.

## Getting Started

### Installation

After you've cloned the project, run `yarn install` from the project root.
> yarn install

### Build

Before starting the app, packages needs to be built. 
> yarn build


If you've updated any packag, rerun `yarn build` to see the latest changes.

### Start The App

> yarn start

### Start Storybook

> yarn storybook

### Testing

To run test in specific app/storybok/package

> cd ./app && yarn test

To run all tests

> yarn test

### Formatting Code

> yarn format

### Linting Code

> yarn lint

### Checking Code Size

> yarn size

### Simulate Continuous Integrations

> yarn ci

## The App

The App specific code is placed in the `./app` folder.

For more info, please see [`./app/README.md`](./app/README.md)

## The Storybook

[The Storybook](./storybook) is created to host components and docs.

## The Packages

Packages are created to host shared features. E.g.
1. [@millifx/error-boundary](./packages/error-boundary/README.md)
1. [@millifx/utils](./packages/utils/README.md)

# Code Quality

Code Quality is automatically checked at `pre-commit`
- ESLint
- Prettier

# Security

[snyk.io](https://app.snyk.io/org/millifx/projects)

# Continuous Integration

Circle CI 
[![CircleCI](https://circleci.com/bb/millifx/app.svg?style=svg&circle-token=44a3e372915cf1eece9ae25c18e25db1df49e6ac)](https://app.circleci.com/pipelines/bitbucket/millifx/app)

# Continuous Delivery

Production: 
[![Netlify Status](https://api.netlify.com/api/v1/badges/89f54884-5339-49bc-ad32-c6a96750ce4c/deploy-status)](https://app.netlify.com/sites/millifx/deploys)

Staging: 
[![Netlify Status](https://api.netlify.com/api/v1/badges/c5d4bb2c-5cb5-43c3-b92f-d36f52666b10/deploy-status)](https://app.netlify.com/sites/millifx-stg/deploys)

# UX Monitoring (TODO)

FullStory