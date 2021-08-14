import React, { useState } from "react";
<<<<<<< HEAD
import { ReactComponent as BrandSVG } from "../../img/branding.svg";
import InviteForm from "./InviteForm";
import InvitePage from "./InvitePage";
import { Brand, SVGWrapper } from "./styledComponent";
=======
import { Typography, Space, Input, Form } from "antd";
import styled from "styled-components";
import BackgroundSVG from "../../img/background.svg";
import BrandSVG from "../../img/branding.svg";
import { Button } from "../../components/Button/index.stories";
import { InviteForm } from "./InviteForm";

const Container = styled.div`
  background-image: url(${BackgroundSVG});
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;
const Brand = styled.div`
  background-image: url(${BrandSVG});
  background-repeat: no-repeat;
  height: 80px;
  width: 159.66px;
  background-size: 100%;
  z-index: 0.5;
  margin-top: 120px;
`;

const Description = styled.div`
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
>>>>>>> 5644dbe (change layout and font)

export const Invite = () => {
<<<<<<< HEAD
  const [isEnteringCode, setIsEnteringCode] = useState(true);
  return (
    <SVGWrapper>
      <Brand>
        <BrandSVG />
      </Brand>
      {isEnteringCode ? (
        <InvitePage
          isEnteringCode={isEnteringCode}
          setIsEnteringCode={setIsEnteringCode}
        />
      ) : (
        <InviteForm
          isEnteringCode={isEnteringCode}
          setIsEnteringCode={setIsEnteringCode}
        />
=======
  const [codeEnter, setCodeEnter] = useState<boolean>(true);
  return (
    <Container>
      <Brand />
      {codeEnter ? (
        <>
          <Description>
            <span>View and manage your forex trading portfolio</span>
          </Description>
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
<<<<<<< HEAD
        </div>
>>>>>>> 418dd75 (add cancel func to return to initial page)
=======
        </>
>>>>>>> 5644dbe (change layout and font)
      )}
    </SVGWrapper>
  );
};
