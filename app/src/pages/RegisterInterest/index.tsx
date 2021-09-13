import React from "react";
import {
  Wrapper,
  CloseButton,
  HeaderTitle,
  HeaderWithCloseButton,
  RegisterInterestDescription,
  OutWrapper,
} from "./index.style";
import { CloseOutlined } from "@ant-design/icons";
import RegisterForm from "../../components/RegisterForm";

const RegisterInterest: React.FC = () => {
  return (
    <OutWrapper>
      <Wrapper>
        <HeaderWithCloseButton>
          <HeaderTitle>Register your interest</HeaderTitle>
          <CloseButton href="/more">
            <CloseOutlined />
          </CloseButton>
        </HeaderWithCloseButton>
        <RegisterInterestDescription>
          Sign up to be notified of any development updates and future release.
        </RegisterInterestDescription>
        <RegisterForm />
      </Wrapper>
    </OutWrapper>
  );
};

export default RegisterInterest;
