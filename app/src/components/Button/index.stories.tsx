import * as React from "react";
import { Button as Component, ButtonProps } from "antd";
import { CloseOutlined, SnippetsOutlined } from "@ant-design/icons";

//customized control
export default {
  title: "@millifx/app/components/Button",
  component: Component,
  argTypes: {
    size: { control: { type: "select", options: ["small", "middle"] } },
    children: { control: "text" },
    type: {
      control: { type: "select", options: { Primary: "primary", Default: "" } },
    },
    disabled: {
      control: { type: "select", options: { Yes: true, No: false } },
    },
    icon: { control: { type: "select", options: { Yes: true, No: false } } },
    loading: { control: { type: "select", options: { Yes: true, No: false } } },
  },
};

const Tamplate = (args: ButtonProps) => (
  <Component
    {...args}
    disabled={args.disabled}
    icon={args.icon ? <CloseOutlined /> : ""}
  />
);

export const Button = Tamplate.bind({});
