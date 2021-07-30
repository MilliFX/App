import { Form, Input } from "antd";
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

const helpMessage = "Please enter your invitation code";

export const InviteForm = ({ codeEnter, setCodeEnter }: IProps) => {
  console.log(codeEnter);
  const [formStatus, setFormStatus] = useState();
  const [form] = Form.useForm();
  return (
    <Wrapper>
      <Form form={form} name="inviteForm">
        <Form.Item
          label="Enter Invitation Code"
          hasFeedback
          validateStatus={formStatus}
          help={formStatus ? helpMessage : ""}
        >
          <Input size="large" type="password" disabled />
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
    </Wrapper>
  );
};
