import * as React from "react";
import { Form, Input, Label } from "../Form/index.styles";
import { LABEL_INVITATION_FORM_LABEL } from "../../utils/constants";
import { Button } from "../Button/index.styles";

export interface InvitationFormProps {
  invitationCode?: string;
}

export const InvitationForm = ({ invitationCode }: InvitationFormProps) => {
  return (
    <>
      <Form>
        <Label>{LABEL_INVITATION_FORM_LABEL}</Label>
        <Input type="text" name="invitationCode" value={invitationCode} />
      </Form>
      <Button>Submit</Button>
    </>
  );
};
