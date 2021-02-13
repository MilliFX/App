# MilliFX App

[![Storybook](https://cdn.jsdelivr.net/gh/storybookjs/brand@master/badge/badge-storybook.svg)](https://millifx.netlify.app/storybook/index.html)
[![Maintainability](https://api.codeclimate.com/v1/badges/86c0b24bf2ec52265f6e/maintainability)](https://codeclimate.com/repos/601f3fa677576e0161000215/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/86c0b24bf2ec52265f6e/test_coverage)](https://codeclimate.com/repos/601f3fa677576e0161000215/test_coverage)
[![Known Vulnerabilities](https://snyk.io/test/github/MilliFX/App/badge.svg)](https://snyk.io/test/github/MilliFX/App)
<a href="https://twitter.com/intent/follow?screen_name=jacktator">
<img src="https://badgen.net/twitter/follow/jacktator?icon=twitter&label=%40jacktator" alt="Official Twitter Handle" />
</a>

React Application which showcases InvestmentPerformance.

[Live Site](https://millifx.netlify.app) | [UI Library](https://millifx.netlify.app/storybook/index.html) | [UI Docs](https://millifx.netlify.app/docs/index.html) | [Bundle Explorer](https://millifx.netlify.app/explorer.html) | [Tech Stacks](app/docs/STACK.md)

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