import * as React from "react";
import { Button } from ".";
import { CloseOutlined, SnippetsOutlined } from "@ant-design/icons";


export default {
  title: "@millifx/app/components/Button",
  component: Button,
  argTypes: {
    size: {control: {type: 'select', options: ['small', 'middle']}},
    children: {control: 'text'},
    type: {control: {type: 'select', options: {Primary: 'primary', Default: ''}}},
    icon: {control: 'text'},
    loading: {control: {type: 'select', options: {Yes: true, No: false}}},
  }
};

const Tamplate  = args => <Button {...args} />

export const ButtonWithText = Tamplate.bind({});
export const ButtonWithTextIcon = Tamplate.bind({});
export const ButtonWithIcon = Tamplate.bind({});

ButtonWithText.args = {
    size: 'small',
    type: 'primary',
    children: 'Button',
    loading: false,
}

ButtonWithTextIcon.args = {
    size: 'small',
    icon: <SnippetsOutlined />,
    type: 'primary',
    children: 'Button',
    loading: false,
}

ButtonWithIcon.args = {
  size: 'small',
  icon: <CloseOutlined />,
  type: 'primary',
  loading: false,
}