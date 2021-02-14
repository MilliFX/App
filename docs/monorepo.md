# Monorepo

This project is structured to be a Monorepo, based on [Yarn Workspace](https://classic.yarnpkg.com/en/docs/workspaces/).

There are three main parts. 

## The App

The App specific code is placed in the `./app` folder.

For more info, please see [`./app/README.md`](./app/README.md)

## The Storybook

[The Storybook](./storybook) is created to host components and docs.

## The Packages

Packages are created to host shared features. E.g.
1. [@millifx/error-boundary](./packages/error-boundary/README.md)
1. [@millifx/utils](./packages/utils/README.md)