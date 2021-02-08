import React from "react";
import ErrorBoundary from "@millifx/error-boundary";
// import ErrorBoundary from "@millifx/error-boundary";
import logo from "./logo.svg";
import "./App.css";
import { InvitationForm } from "./components/InvitationForm";

const AppWithRouter = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <InvitationForm />
      </header>
    </div>
  );
};

const App = () => (
  <ErrorBoundary version={process.env.REACT_APP_COMMIT}>
    <AppWithRouter />
  </ErrorBoundary>
);

export default App;
