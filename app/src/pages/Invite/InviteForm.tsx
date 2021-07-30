import { Form, Input } from "antd";
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
const FormLabel = styled.div`
  width: 320px;
  height: 40px;
  font-family: Barlow;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 40px;
  padding: 0 0 8px;
  color: #fca311;
`;
const helpMessage = "Please enter your invitation code";

export const InviteForm = ({ codeEnter, setCodeEnter }: IProps) => {
  console.log(codeEnter);
  const [formStatus, setFormStatus] = useState<ValidateStatus>();
  const [form] = Form.useForm();
  const [inputDisabled, setInputDisabled] = useState<boolean>(false);
  const [btnLoading, setBtnLoading] = useState<boolean>(false);
  const [code, setCode] = useState<string | number | undefined>(undefined);
  const onCheck = () => {
    console.log(code);
    if (!code) {
      setFormStatus("warning");
    } else {
      setInputDisabled(!inputDisabled);
      setBtnLoading(!btnLoading);
      console.log("call api for login");
      /*
       call api success 
      */
      //call api return failed code
    }
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value);
  };
  return (
    <Wrapper>
      <Form form={form} name="inviteForm">
        {formStatus ? <FormLabel>Enter Invitation Code</FormLabel> : " "}
        <Form.Item
          label={!formStatus ? "Enter Invitation Code" : ""}
          hasFeedback
          validateStatus={formStatus}
          help={formStatus ? helpMessage : ""}
        >
          <Input
            size="large"
            type="password"
            disabled={inputDisabled}
            value={code}
            onChange={handleInputChange}
          />
        </Form.Item>
        <br />
        <Form.Item>
          <Button type="primary" block onClick={onCheck} loading={btnLoading}>
            Submit
          </Button>
        </Form.Item>
        <Form.Item>
          <Button block onClick={() => setCodeEnter(!codeEnter)}>
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </Wrapper>
  );
};
