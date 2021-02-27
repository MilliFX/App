# MilliFX Repo

| Environment | Continuous Integration  | Continuous Deployment | Coverage
|-------------|---|---|---|
| [Production](https://app.millifx.com)  | [![CircleCI](https://circleci.com/bb/millifx/app/tree/main.svg?style=svg&circle-token=44a3e372915cf1eece9ae25c18e25db1df49e6ac)](https://app.circleci.com/pipelines/bitbucket/millifx/app?branch=main) | [![Netlify Status](https://api.netlify.com/api/v1/badges/89f54884-5339-49bc-ad32-c6a96750ce4c/deploy-status)](https://app.netlify.com/sites/millifx/deploys)  | [![codecov](https://codecov.io/bb/millifx/app/branch/main/graph/badge.svg?token=8OJ3F9I62B)](https://codecov.io/bb/millifx/app/branch/main) |
| [Staging](https://app-stg.millifx.com) | [![CircleCI](https://circleci.com/bb/millifx/app/tree/staging.svg?style=svg&circle-token=44a3e372915cf1eece9ae25c18e25db1df49e6ac)](https://app.circleci.com/pipelines/bitbucket/millifx/app?branch=staging) | [![Netlify Status](https://api.netlify.com/api/v1/badges/c5d4bb2c-5cb5-43c3-b92f-d36f52666b10/deploy-status)](https://app.netlify.com/sites/millifx-stg/deploys)  | [![codecov](https://codecov.io/bb/millifx/app/branch/staging/graph/badge.svg?token=8OJ3F9I62B)](https://codecov.io/bb/millifx/app/branch/staging) |
| [Development](https://app-dev.millifx.com) | [![CircleCI](https://circleci.com/bb/millifx/app/tree/development.svg?style=svg&circle-token=44a3e372915cf1eece9ae25c18e25db1df49e6ac)](https://app.circleci.com/pipelines/bitbucket/millifx/app?branch=development) | [![Netlify Status](https://api.netlify.com/api/v1/badges/fbed9a93-cd22-4a28-a5df-67e6a2631b4e/deploy-status)](https://app.netlify.com/sites/millifx-dev/deploys) | [![codecov](https://codecov.io/bb/millifx/app/branch/development/graph/badge.svg?token=8OJ3F9I62B)](https://codecov.io/bb/millifx/app/branch/development) |
 
[![MIT license](https://img.shields.io/badge/License-MIT-blue.svg)](https://lbesson.mit-license.org/)
[![StackShare](http://img.shields.io/badge/tech-stack-0690fa.svg?style=flat)](https://stackshare.io/millifx/app)
[![Storybook](https://cdn.jsdelivr.net/gh/storybookjs/brand@master/badge/badge-storybook.svg)](https://millifx.netlify.app/storybook/index.html)
![Twitter Follow](https://img.shields.io/twitter/follow/millifx?style=social)

[UI Library](https://app.millifx.com/storybook/index.html) | [UI Docs](https://app.millifx.com/docs/index.html)
| [Bundle Explorer](https://app.millifx.com/explorer.html)

## Mono Repo

This app is structured as mono repo, for more info, please visit [Monorepo](./docs/monorepo.md);

## Getting Started

First, install dependencies

> yarn install

Secondly, build the monorepo

> yarn build

To get started, you can start **App with Serverless Functions** by running:

> yarn start

You will see 2 browser window open:

| Component | URL | Description |
|-----------|-----|---|
|App|http://localhost:3000|The React App|
|Functions|http://localhost:8888|The Netlify Functions|

### More Commands

For more info, please visit [Getting Started](./docs/getting-started.md);

## Theming

For MVP, the App is using [Themed Ant Design](https://ant.design/docs/react/customize-theme).

The theme can be customized
using [Ant Design Theme Builder](https://insiight.github.io/ant-design-theme-builder/#/button).

Once done, click on **View Code**, copy and paste the generated code to `theme.less`.

# Code Quality

Code Quality is automatically checked at `pre-commit`

- ESLint
- Prettier

# Coverage

![](https://codecov.io/bb/millifx/app/branch/development/graphs/icicle.svg?token=8OJ3F9I62B)

# Security

[snyk.io](https://app.snyk.io/org/millifx/projects)
