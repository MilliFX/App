# ErrorBoundary

An Error Boundary for React App, which catches all unhandled error and report to Sentry.

## Install

    yarn add @millifx/error-boundary

## Usage

    import { ErrorBoundary } from '@millifx/error-boundary';

    const App = () => (
      <ErrorBoundary>
        <Main />
      </ErrorBoundary>
    );    
