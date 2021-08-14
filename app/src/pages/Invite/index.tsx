import React, { useState } from "react";
import { ReactComponent as BrandSVG } from "../../img/branding.svg";
import InviteForm from "./InviteForm";
import InvitePage from "./InvitePage";
import { Brand, SVGWrapper } from "./styledComponent";

export const Invite = () => {
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
      )}
    </SVGWrapper>
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

const InviteForm = () => {
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
        <Form.Item>
          <Button type="primary" block>
            Submit
          </Button>
        </Form.Item>
        <Form.Item>
          <Button block> Cancel </Button>
        </Form.Item>
      </Form>
    </>
  );
};
