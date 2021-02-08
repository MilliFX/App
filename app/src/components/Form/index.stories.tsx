import * as React from "react";
import {Form, Label, Input} from './index.styles';

export default {
  title: "@millifx/app/components/Form",
};

export const Default = () => (
  <Form>
    <Label>First Name</Label>
    <Input type="text" name="firstName" value={"value"} />
    <Label>Last Name</Label>
    <Input type="text" name="lastName" value={"value"} />
  </Form>
)