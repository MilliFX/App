import React from "react";
import ErrorBoundary from "@millifx/error-boundary";
import { Button } from "antd";
// import ErrorBoundary from "@millifx/error-boundary";
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
        <Button type="primary">Learn React</Button>
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
