import React, { useState } from "react";
import { Typography, Space, Input } from "antd";
import styled from "styled-components";
import BackgroundSVG from "../../img/background.svg";
import BrandSVG from "../../img/branding.svg";
import { Button } from "../../components/Button/index.stories";
// import { Link } from "../../components/Link/index.stories";

const Container = styled.div`
  background-image: url(${BackgroundSVG});
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Brand = styled.div`
  background-image: url(${BrandSVG});
  background-repeat: no-repeat;
  height: 80px;
  width: 159.66px;
  background-size: 100%;
  z-index: 0.5;
  margin: 20px auto;
`;

const Description = styled.div`
  font-family: Barlow;
  font-style: normal;
  font-weight: normal;
  padding: 40px;
  font-size: 16px;
  line-height: 24px;
  color: #505050;
`;
const EnterButton = styled.div`
  width: 240px;
`;

export const Invite = () => {
  const [codeEnter, setCodeEnter] = useState(true);
  const handleFormChange = () => {
    setCodeEnter(!codeEnter);
  };
  return (
    <Container>
      <Brand />
      {codeEnter ? (
        <>
          <Description>
            <span>View and manage your forex trading portfolio</span>
          </Description>
          <EnterButton>
            <Button type="primary" block onClick={() => handleFormChange()}>
              Enter with code
            </Button>
          </EnterButton>
        </>
      ) : (
        <div> form </div>
      )}
    </Container>
  );
};
