import React, { useState } from "react";
import { Typography, Space, Input, Form, Modal } from "antd";
import styled from "styled-components";
import BackgroundSVG from "../../img/background.svg";
import BrandSVG from "../../img/branding.svg";
import { Button } from "../../components/Button/index.stories";
import { InviteForm } from "./InviteForm";

const Container = styled.div`
  background-image: url(${BackgroundSVG});
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;
const Brand = styled.div`
  background-image: url(${BrandSVG});
  background-repeat: no-repeat;
  height: 80px;
  width: 160px;
  background-size: 100%;
  z-index: 0.5;
  margin-top: 120px;
`;

const Slogan = styled.div`
  font-family: Barlow;
  font-style: normal;
  font-weight: normal;
  width: 320px;
  height: 24px;
  font-size: 16px;
  line-height: 24px;
  color: #505050;
  margin-top: 88px;
`;
const EnterButton = styled.div`
  width: 240px;
  margin-top: 40px;
  height: 44px;
`;

export const Invite = () => {
  const [codeEnter, setCodeEnter] = useState<boolean>(true);
  return (
    <Container>
      <Brand />
      {codeEnter ? (
        <>
          <Slogan>
            <span>View and manage your forex trading portfolio</span>
          </Slogan>
          <EnterButton>
            <Button
              type="primary"
              block
              onClick={() => setCodeEnter(!codeEnter)}
            >
              Enter with code
            </Button>
          </EnterButton>
        </>
      ) : (
        <>
          <InviteForm codeEnter={codeEnter} setCodeEnter={setCodeEnter} />
        </>
      )}
    </Container>
  );
};
