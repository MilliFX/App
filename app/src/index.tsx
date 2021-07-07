import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { FULLSTORY_ORG_ID } from "./utils/constants";
import * as FullStory from "@fullstory/browser";
import { Router, Switch } from "react-router-dom";
import { customHistory, SentryRoute } from "@millifx/error-boundary";

FULLSTORY_ORG_ID ? FullStory.init({ orgId: FULLSTORY_ORG_ID }) : null;

ReactDOM.render(
  <React.StrictMode>
    <Router history={customHistory}>
      <Switch>
        <SentryRoute path="/test1" component={() => <div>Test1</div>} />
        <SentryRoute path="/test2" component={() => <div>Test2</div>} />
        <SentryRoute path="/" component={App} />
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
// serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals(console.info);
