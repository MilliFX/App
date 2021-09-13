import React from "react";
import {
  CloseButton,
  HeaderTitle,
  HeaderWithCloseButton,
} from "../RegisterInterest/index.style";
import { AboutDescription, AboutWrapper, Wrapper } from "./index.style";
import { CloseOutlined } from "@ant-design/icons";
import { Typography } from "antd";

const { Paragraph } = Typography;

const About: React.FC = () => {
  return (
    <Wrapper>
      <AboutWrapper>
        <HeaderWithCloseButton>
          <HeaderTitle>About Millifx</HeaderTitle>
          <CloseButton href="/more">
            <CloseOutlined />
          </CloseButton>
        </HeaderWithCloseButton>
        <AboutDescription>
          <Paragraph>
            MilliFX is a Forex trading service provider where users can manage
            their investment through any of their devices.
          </Paragraph>
          <Paragraph>
            We are currently in development and getting things ready for our
            release.
          </Paragraph>
          <Paragraph>
            For any enquiries, please contact <span>hello@millifx.com</span>
          </Paragraph>
        </AboutDescription>
      </AboutWrapper>
    </Wrapper>
  );
};

export default About;
