import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { FULLSTORY_ORG_ID } from "./utils/constants";
import * as FullStory from "@fullstory/browser";

FULLSTORY_ORG_ID ? FullStory.init({ orgId: FULLSTORY_ORG_ID }) : null;

ReactDOM.render(
  <React.StrictMode>
    <App />
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
