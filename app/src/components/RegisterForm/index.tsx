import { Input, Modal } from "antd";
import React, { useState } from "react";
import {
  HelpMessage,
  InputWrapper,
  LabelNormal,
  LabelWarning,
  ModalMessage,
} from "../../pages/Invite/index.style";
import { FormWrapper } from "../../pages/RegisterInterest/index.style";
import { Button } from "../Button/index.stories";

const RegisterForm: React.FC = () => {
  const [formWarning, setFormWarning] = useState<boolean>(false);
  const [inputDisabled, setInputDisabled] = useState<boolean>(false);
  const [btnLoading, setBtnLoading] = useState<boolean>(false);
  const [registerEmail, setRegisterEmail] = useState<
    string | number | undefined
  >(undefined);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterEmail(e.target.value);
  };
  const onCheck = () => {
    if (!registerEmail) {
      setFormWarning(!formWarning);
    } else {
      setInputDisabled(!inputDisabled);
      setBtnLoading(!btnLoading);
      /*
         email validation and call api success code
      */
      Modal.success(modalConfig);
      //call api return failed code
    }
  };
  const modalConfig = {
    title: "Thank you for registering your interest",
    content: (
      <ModalMessage>
        We will send you an update when MilliFX is open for registration.
      </ModalMessage>
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
        <LabelWarning>Your email address</LabelWarning>
      ) : (
        <LabelNormal>Your email address</LabelNormal>
      )}
      <InputWrapper>
        <Input
          size="large"
          placeholder="sam@example.com"
          disabled={inputDisabled}
          value={registerEmail}
          onChange={handleInputChange}
        />
        {formWarning && (
          <HelpMessage> Please enter a valid email address </HelpMessage>
        )}
      </InputWrapper>
      <Button type="primary" block onClick={onCheck} loading={btnLoading}>
        Submit
      </Button>
    </FormWrapper>
  );
};

export default RegisterForm;
