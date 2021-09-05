import { Input, Modal } from "antd";
import React, { useState } from "react";
import { Button } from "../Button/index.stories";
import {
  ButtonWrapper,
  HelpMessage,
  InputWrapper,
  LabelNormal,
  LabelWarning,
  ModalMessage,
  FormWrapper,
} from "../../pages/Invite/index.style";
import { InviteCodeProps } from "../../pages/Invite/types";

const InviteForm: React.FC<InviteCodeProps> = ({
  isEnteringCode,
  setIsEnteringCode,
}: InviteCodeProps) => {
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
      /*
       call api success code
      */
      //call api return failed code
      Modal.warning(modalConfig);
    }
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInviteCode(e.target.value);
  };
  const modalConfig = {
    title: "Invalid Invitation Code",
    content: (
      <>
        <ModalMessage>The code you have entered is invalid.</ModalMessage>
      </>
    ),
    onButtonProps: { size: "small" },
    afterClose: () => {
      setInputDisabled(false);
      setBtnLoading(false);
      setFormWarning(false);
    },
  };
  return (
    <FormWrapper>
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
        {formWarning && (
          <HelpMessage> Please enter your invitation code </HelpMessage>
        )}
      </InputWrapper>
      <ButtonWrapper>
        <Button type="primary" block onClick={onCheck} loading={btnLoading}>
          Submit
        </Button>
      </ButtonWrapper>
      <ButtonWrapper>
        <Button block onClick={() => setIsEnteringCode(!isEnteringCode)}>
          Cancel
        </Button>
      </ButtonWrapper>
    </FormWrapper>
  );
};

export default InviteForm;
