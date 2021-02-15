# MilliFX App

| Environment | Continuous Integration  | Continuous Deployment  |
|-------------|---|---|
| [Production](https://app.millifx.com)  | [![CircleCI](https://circleci.com/bb/millifx/app/tree/main.svg?style=svg&circle-token=44a3e372915cf1eece9ae25c18e25db1df49e6ac)](https://app.circleci.com/pipelines/bitbucket/millifx/app?branch=main) | [![Netlify Status](https://api.netlify.com/api/v1/badges/89f54884-5339-49bc-ad32-c6a96750ce4c/deploy-status)](https://app.netlify.com/sites/millifx/deploys)  |
| [Staging](https://app-stg.millifx.com) | [![CircleCI](https://circleci.com/bb/millifx/app/tree/staging.svg?style=svg&circle-token=44a3e372915cf1eece9ae25c18e25db1df49e6ac)](https://app.circleci.com/pipelines/bitbucket/millifx/app?branch=staging) | [![Netlify Status](https://api.netlify.com/api/v1/badges/c5d4bb2c-5cb5-43c3-b92f-d36f52666b10/deploy-status)](https://app.netlify.com/sites/millifx-stg/deploys)  |
| [Development](https://app-dev.millifx.com) | [![CircleCI](https://circleci.com/bb/millifx/app/tree/development.svg?style=svg&circle-token=44a3e372915cf1eece9ae25c18e25db1df49e6ac)](https://app.circleci.com/pipelines/bitbucket/millifx/app?branch=development) | [![Netlify Status](https://api.netlify.com/api/v1/badges/fbed9a93-cd22-4a28-a5df-67e6a2631b4e/deploy-status)](https://app.netlify.com/sites/millifx-dev/deploys) |

[![MIT license](https://img.shields.io/badge/License-MIT-blue.svg)](https://lbesson.mit-license.org/)
[![Storybook](https://cdn.jsdelivr.net/gh/storybookjs/brand@master/badge/badge-storybook.svg)](https://millifx.netlify.app/storybook/index.html)
![Twitter Follow](https://img.shields.io/twitter/follow/millifx?style=social)

[UI Library](https://app.millifx.com/storybook/index.html) | [UI Docs](https://app.millifx.com/docs/index.html)
| [Bundle Explorer](https://app.millifx.com/explorer.html)

# Mono Repo

This app is structured as mono repo, for more info, please visit [Monorepo](./docs/monorepo.md);

## Getting Started

To get started, please visit [Getting Started](./docs/getting-started.md);

# Code Quality

Code Quality is automatically checked at `pre-commit`

- ESLint
- Prettier

# Security

[snyk.io](https://app.snyk.io/org/millifx/projects)
