# MilliFX App

[![CircleCI](https://circleci.com/bb/millifx/app.svg?style=svg&circle-token=44a3e372915cf1eece9ae25c18e25db1df49e6ac)](https://app.circleci.com/pipelines/bitbucket/millifx/app)
Staging: [![Netlify Status](https://api.netlify.com/api/v1/badges/c5d4bb2c-5cb5-43c3-b92f-d36f52666b10/deploy-status)](https://app.netlify.com/sites/millifx-stg/deploys)
Production: [![Netlify Status](https://api.netlify.com/api/v1/badges/89f54884-5339-49bc-ad32-c6a96750ce4c/deploy-status)](https://app.netlify.com/sites/millifx/deploys)
[![Storybook](https://cdn.jsdelivr.net/gh/storybookjs/brand@master/badge/badge-storybook.svg)](https://millifx.netlify.app/storybook/index.html)
<a href="https://twitter.com/intent/follow?screen_name=millifx">
<img src="https://badgen.net/twitter/follow/millifx?icon=twitter&label=%40millifx" alt="Official Twitter Handle" />
</a>

React Application which showcases InvestmentPerformance.

[Production](https://app.millifx.com) | [Staging](https://app-stg.millifx.com) | [UI Library](https://app.millifx.com/storybook/index.html) | [UI Docs](https://app.millifx.com/docs/index.html) | [Bundle Explorer](https://app.millifx.com/explorer.html) | [Tech Stacks](app/docs/STACK.md)

This project was created with [Yarn Workspace](https://classic.yarnpkg.com/en/docs/workspaces/).

# Mono Repo

This app is structured as mono repo.

## The App

The App specific code is placed in the `./app` folder.

For more info, please see [`./app/README.md`](./app/README.md)

## The Storybook

[The Storybook](./storybook/README.md) is created to host components and docs.

## The Packages (TODO)

Presentational Components are created and placed into separate packages.

# Testing & Strategy

## Component = Presentational / Dumb Components

Presentational / Dumb Components are written and presented in Storybook.

Components are covered by Snapshots to ensure consistency.

## Container = Container / Smart Components

Container / Smart Components are written with network Requests

Containers are covered by Unit Test and Mock Data.

## Provider = Redux-Like Statement Management Provider

Given it's a simple application, `redux` package would be too heavy an overkill on the bundle size.

Instead, React Hooks are used to achieve Redux-Like features

- Context and Provider
- `useReducer`
- `utils`

Reducers and Utils are covered by Unit Tests.

# Code Quality

Code Quality is automatically checked at `pre-commit`
- ESLint
- Prettier

# Error Handling

All Network Errors are handled within the `Provider`.

Any unhandled error, are caught by a catch-all `ErrorBoundary`, which reports to Sentry.

# Optimization

Bundles are code-split into small chucks and lazy loading is used.

# PWA and Offline-First

All files and responses are cached using approriate strategies.

Once user has visited the app once, he'll be able to use it offline.

![](./app/architecture.png)

# Security

SNYK

# CICD

Netlify

# UX Monitoring (TODO)

FullStory