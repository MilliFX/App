import * as React from "react";
import {InvitationForm as Component, InvitationFormProps} from './index';

export default {
  title: "@millifx/app/components/InvitationForm",
  component: Component,
};

export const WithInvitation = (args: InvitationFormProps) => <Component {...args} />;
WithInvitation.args = {
  invitationCode: "invest"
}

export const WithoutInvitation = (args: InvitationFormProps) => <Component {...args} />;
WithoutInvitation.args = {
}