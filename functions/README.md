# Functions

This package contains all the serverless functions used by MilliFX.

## Netlify

Currently, [Netlify Functions](https://docs.netlify.com/functions/overview/) are chosen to host the functions.

## Getting Started

A sample function has already been written.

`./src/hello`

## Adding a new Function

To add a new function, please copy the [hello](./src/hello) and modify.

## Build

> yarn build

## Test

> yarn test

## Note

Given that serverless functions are ran in Node environment, only **CommonJS** modules are supported.

TypeScript source scripts will need to be transpiled into `/dist/cjs`. 