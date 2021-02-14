import * as React from "react";
import * as ReactROM from "react-dom";
import App from "./App";

describe("<App />", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactROM.render(<App />, div);
  });
});
