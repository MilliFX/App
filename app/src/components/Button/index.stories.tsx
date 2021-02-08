import * as React from "react";
import {Button as Componnt, ButtonProps} from './index.styles';

export default {
  title: "@millifx/app/components/Button",
  component: Componnt,
};

export const Default = (args: ButtonProps) => <Componnt {...args}>Button</Componnt>
