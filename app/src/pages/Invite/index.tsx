import React, { useState } from "react";
import { Typography, Space, Input, Form } from "antd";
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
        <div>
          <InviteForm codeEnter={codeEnter} setCodeEnter={setCodeEnter} />
        </div>
      )}
    </Container>
  );
};

const Wrapper = styled.div`
  width: 320px;
  height: auto;
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const InputWrapper = styled.div`
  width: 320px;
  height: auto;
  margin-bottom: 20px;
  display: flex;
  flex-diretion: column;
  align-items: flex-start;
  justify-content: center;
  border: 1px solid green;
`;

interface IProps {
  codeEnter: boolean;
  setCodeEnter: (value: boolean) => void;
}

const InviteForm = ({ codeEnter, setCodeEnter }: IProps) => {
  console.log(codeEnter);
  return (
    <>
      <Form>
        <Form.Item
          label="Enter Invitation Code"
          hasFeedback
          validateStatus="warning"
          help="Please enter your invitation code"
        >
          <Input size="large" />
        </Form.Item>
        <br />
        <Form.Item>
          <Button type="primary" block>
            Submit
          </Button>
        </Form.Item>
        <Form.Item>
          <Button block onClick={() => setCodeEnter(!codeEnter)}>
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
