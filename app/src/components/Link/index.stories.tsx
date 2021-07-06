import * as React from "react";
import { Typography } from 'antd'


const Component = Typography.Link;
export default {
  title: "@millifx/app/components/Link",
  component: Component,
  argTypes: {
    children: { control: "text" },
    disabled: {
      control: { type: "select", options: { Yes: true, No: false } }
    },
    underline: {
      control: { type: "select", options: { Yes: true, No: false } }
    },
    // size: {
    //   control: { type: "select", options: ["small", "middle"] }
    // }
  }
};


const Template = (args) => (
  <Component
    {...args}
    disabled={args.disabled}
  />
);

export const Link = Template.bind({});
Link.args = {
  children: 'A demo link',
  disabled: false,
  underline: false
}