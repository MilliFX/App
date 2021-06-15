import * as React from "react";
import { Typography } from "antd"
import { LinkProps } from "antd/lib/typography/Link";

const { Link } = Typography;

export const Links = (props: LinkProps & React.RefAttributes<HTMLElement>) => {
  return (
    <Link {...props}/> 
  )
};
