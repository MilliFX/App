import { Form, Input, Modal } from "antd";
import { ValidateStatus } from "antd/lib/form/FormItem";
import React, { useState } from "react";
import styled from "styled-components";
import { Button } from "../../components/Button/index.stories";

interface IProps {
  codeEnter: boolean;
  setCodeEnter: (value: boolean) => void;
}
const Wrapper = styled.div`
  width: 320px;
  height: auto;
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const LabelNormal = styled.div`
  width: 320px;
  font-family: Barlow;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 19px;
  margin-top: 40px;
  margin-bottom: 8px;
  color: #505050;
`;

const LabelWarning = styled.div`
  width: 320px;
  font-family: Barlow;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 19px;
  margin-top: 40px;
  margin-bottom: 8px;
  color: #fca311;
`;

const InputWrapper = styled.div`
  width: 320px;
  margin-bottom: 40px;
`;

const ButtonWrapper = styled.div`
  width: 320px;
  margin-bottom: 8px;
`;
const ModalMessage = styled.div`
  width: 216px;
  height: 48px;
  font-family: Barlow;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  color: #505050;
`;
const HelpMessage = styled.div`
  font-family: Barlow;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 18px;
  color: #fca311;
`;

const modalConfig = {
  title: "Invalid Invitation Code",
  content: (
    <>
      <ModalMessage>The code you have entered is invalid.</ModalMessage>
    </>
  ),
  onButtonProps: { size: "small" },
};

export const InviteForm = ({ codeEnter, setCodeEnter }: IProps) => {
  const [formWarning, setFormWarning] = useState<boolean>(false);
  const [inputDisabled, setInputDisabled] = useState<boolean>(false);
  const [btnLoading, setBtnLoading] = useState<boolean>(false);
  const [inviteCode, setInviteCode] = useState<string | number | undefined>(
    undefined
  );
  const onCheck = () => {
    if (!inviteCode) {
      setFormWarning(!formWarning);
    } else {
      setInputDisabled(!inputDisabled);
      setBtnLoading(!btnLoading);
      console.log("call api for login");
      /*
       call api success code
      */
      //call api return failed code
      const modal = Modal.warning(modalConfig);
    }
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInviteCode(e.target.value);
  };
  return (
    <Wrapper>
      {formWarning ? (
        <LabelWarning>Enter Invitation Code</LabelWarning>
      ) : (
        <LabelNormal>Enter Invitation Code</LabelNormal>
      )}

      <InputWrapper>
        <Input
          size="large"
          type="password"
          disabled={inputDisabled}
          value={inviteCode}
          onChange={handleInputChange}
        />
        {formWarning ? (
          <HelpMessage> Please enter your invitation code </HelpMessage>
        ) : (
          ""
        )}
      </InputWrapper>
      <ButtonWrapper>
        <Button type="primary" block onClick={onCheck} loading={btnLoading}>
          Submit
        </Button>
      </ButtonWrapper>
      <ButtonWrapper>
        <Button block onClick={() => setCodeEnter(!codeEnter)}>
          Cancel
        </Button>
      </ButtonWrapper>
    </Wrapper>
  );
};
