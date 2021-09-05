import React from "react";
import {
  BottomWrapper,
  Navigation,
  NavigationItem,
  NavigationLink,
  StyledTitle,
  TopWrapper,
  Wrapper,
} from "./index.style";
import {
  AlertOutlined,
  AppstoreAddOutlined,
  BellOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";

const More: React.FC = () => {
  return (
    <Wrapper>
      <TopWrapper>
        <StyledTitle>More</StyledTitle>
      </TopWrapper>
      <BottomWrapper>
        <Navigation>
          <NavigationItem>
            <NavigationLink href="/">
              <AlertOutlined />
              <span>Register your interest</span>
            </NavigationLink>
          </NavigationItem>
          <NavigationItem>
            <NavigationLink>
              <AppstoreAddOutlined />
              <span>Add to Home screen</span>
            </NavigationLink>
          </NavigationItem>
          <NavigationItem>
            <NavigationLink>
              <BellOutlined />
              <span>Notification settings</span>
            </NavigationLink>
          </NavigationItem>
          <NavigationItem>
            <NavigationLink>
              <InfoCircleOutlined />
              <span>About MilliFX</span>
            </NavigationLink>
          </NavigationItem>
        </Navigation>
      </BottomWrapper>
    </Wrapper>
  );
};

export default More;
