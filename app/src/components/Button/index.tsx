import * as React from "react";
import { Button as AntdButton } from "antd";
import { BaseButtonProps } from "antd/lib/button/button";

export const Button = (props: BaseButtonProps) => {
  return (
    <AntdButton { ...props } />
  );
};
