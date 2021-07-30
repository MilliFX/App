import React from "react";
import ErrorBoundary from "@millifx/error-boundary";
import { Account } from "@millifx/utils";
import { SessionProvider } from "./containers/SessionProvider";
import { useSession } from "./containers/SessionProvider/hook";
import * as FullStory from "@fullstory/browser";
import { Router, Switch } from "react-router-dom";
import { customHistory, SentryRoute } from "@millifx/error-boundary";
import { Invite } from "./pages/Invite/index";

const sampleAccount: Account = {
  id: 5875672,
  name: "MilliFX Master Account",
  gain: 545.1390111241,
  drawdown: 0.06,
  demo: false,
  change: 537.105380649,
};

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
  const { name, gain } = sampleAccount;

  const { uuid } = useSession();
  console.log("SessionConsumer Detected UUID", uuid);
  if (uuid) {
    FullStory.identify(uuid);
  }

  return (
    <Router history={customHistory}>
      <Switch>
        <SentryRoute path="/" exact component={() => <h1>Homepage</h1>} />
        <SentryRoute path="/invite" component={Invite} />
      </Switch>
    </Router>
  );
};

export default App;
