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
import StyleModal from "./StyleModal";

const RegisterForm: React.FC = () => {
  const [formWarning, setFormWarning] = useState<boolean>(false);
  const [inputDisabled, setInputDisabled] = useState<boolean>(false);
  const [btnLoading, setBtnLoading] = useState<boolean>(false);
  const [isModalRender, setIsModalRender] = useState<boolean>(false);
  const [registerEmail, setRegisterEmail] = useState<
    string | number | undefined
  >(undefined);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterEmail(e.target.value);
  };
  const handleModalOk = () => {
    setInputDisabled(!inputDisabled);
    setBtnLoading(!btnLoading);
    setIsModalRender(false);
  };
  const onCheck = () => {
    if (!registerEmail) {
      setFormWarning(!formWarning);
    } else {
      setInputDisabled(!inputDisabled);
      setBtnLoading(!btnLoading);
      /*
         call api success code
      */
      setIsModalRender(!isModalRender);
      //call api return failed code
    }
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
      <Modal
        title="Thank you for registering your interest"
        closable={false}
        visible={isModalRender}
        modalRender={undefined}
        footer={[
          <Button type="primary" onClick={handleModalOk}>
            OK
          </Button>,
        ]}
      >
        <ModalMessage>
          We will send you an update when MilliFX is open for registration.
        </ModalMessage>
      </Modal>
    </FormWrapper>
  );
};

export default RegisterForm;
