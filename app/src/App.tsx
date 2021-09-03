import React from "react";
import ErrorBoundary from "@millifx/error-boundary";
import { StyleAntLayout as Layout } from "./style";
import { SessionProvider } from "./containers/SessionProvider";
import { useSession } from "./containers/SessionProvider/hook";
import * as FullStory from "@fullstory/browser";
import { Router, Switch } from "react-router-dom";
import { customHistory, SentryRoute } from "@millifx/error-boundary";
import * as Sentry from "@sentry/react";
import { Invite } from "./pages/Invite";
import More from "./pages/More";
import RegisterInterest from "./pages/RegisterInterest/index";

const { Content } = Layout;

const App = () => (
  <ErrorBoundary version={process.env.REACT_APP_COMMIT}>
    <AppWithSession />
  </ErrorBoundary>
);

const AppWithSession = () => (
  <SessionProvider>
    <AppWithRouter />
  </SessionProvider>
);

const AppWithRouter = () => {
  const { uuid } = useSession();
  console.log("SessionConsumer Detected UUID", uuid);
  if (uuid) {
    FullStory.identify(uuid);
  }

  return (
    <Router history={customHistory}>
      <Layout>
        <Content>
          <Switch>
            <SentryRoute path="/" exact component={() => <h1>Homepage</h1>} />
            <SentryRoute path="/invite" component={Invite} />
            <SentryRoute path="/more" component={More} />
            <SentryRoute
              path="/registerinterest"
              component={RegisterInterest}
            />
          </Switch>
        </Content>
      </Layout>
    </Router>
  );
};

export default Sentry.withProfiler(App);
