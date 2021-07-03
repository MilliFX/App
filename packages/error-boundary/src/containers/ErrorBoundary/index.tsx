import * as React from "react";
import { Component, ErrorInfo, ReactNode } from "react";
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import GenericError from "../../components/GenericError";
import { SENTRY_DSN } from "../../utils/constants";
import { getEnv } from "@millifx/utils";
import { createBrowserHistory } from "history";
import { Route } from "react-router-dom";

interface Props {
  children: ReactNode;
  version?: string;
}

interface State {
  hasError: boolean;
}

export const customHistory = createBrowserHistory();
// export const SentryRoute = Sentry.withSentryRouting(RouteProps);

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const hostName = window.location.host;
    const env = getEnv(hostName);
    Sentry.init({
      dsn: SENTRY_DSN,
      release: props.version,
      environment: env,
      integrations: [new Integrations.BrowserTracing({
        routingInstrumentation: Sentry.reactRouterV5Instrumentation(customHistory),
      })],
      tracesSampleRate: 1.0,
    });

    this.state = {
      hasError: false,
    };
  }

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    Sentry.captureException(error);
  }

  public render() {
    const { hasError } = this.state;

    const { children } = this.props;

    if (hasError) {
      return <GenericError />;
    }

    return children;
  }
}

export default ErrorBoundary;
