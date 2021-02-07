import * as React from "react";
import { Component, ErrorInfo, ReactNode } from "react";
import * as Sentry from "@sentry/browser";
import { Integrations } from "@sentry/tracing";
import GenericError from "../../components/GenericError";
import { SENTRY_DSN } from "../../utils/constants";

interface Props {
  children: ReactNode;
  version: string;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    Sentry.init({
      dsn: SENTRY_DSN,
      release: props.version,
      debug: process.env.NODE_ENV !== "production",
      environment: process.env.NODE_ENV,
      integrations: [new Integrations.BrowserTracing()],
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
