import * as React from "react";
import { Button as Component } from "antd";
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
    disabled: { control: { type: "select", options: { Yes: true, No: false } }},
    icon: { control: { type: "select", options: { Yes: true, No: false } }},
    loading: { control: { type: "select", options: { Yes: true, No: false } } },
  },
};

const Tamplate = (args) => (
  <Component {...args} disabled={args.disabled} icon={args.icon ? <CloseOutlined /> : ""}/>
);

export const Button = Tamplate.bind({});

Button.args = {
  size: "middle",
  type: "primary",
  children: "Button",
  disabled:false,
  icon: false,
  loading: false,
};