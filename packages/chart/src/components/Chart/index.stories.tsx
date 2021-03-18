import * as React from "react";
import { default as Component } from ".";
import { mockData } from "../../utils/constants";

export default {
  title: "@millifx/chart",
  component: Component,
};

export const Chart = () => <Component data={mockData} />;

