import React from "react";
import ErrorBoundary from "@millifx/error-boundary";
import logo from "./logo.svg";
import "./App.css";

const AppWithRouter = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
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
