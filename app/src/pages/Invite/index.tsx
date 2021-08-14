import React, { useState } from "react";
import { ReactComponent as BrandSVG } from "../../img/branding.svg";
import InviteForm from "./InviteForm";
import InvitePage from "./InvitePage";
import { Brand, SVGWrapper } from "./styledComponent";

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
        <div>
          <InviteForm codeEnter={codeEnter} setCodeEnter={setCodeEnter} />
        </div>
>>>>>>> 418dd75 (add cancel func to return to initial page)
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
