import React from "react";
import { Slogan, EnterButton } from "./styledComponent";
import { Button } from "../../components/Button/index.stories";
import { InviteCodeProps } from "./type";

const InvitePage = ({ isEnteringCode, setIsEnteringCode }: InviteCodeProps) => {
  return (
    <>
      <Slogan>
        <span>View and manage your forex trading portfolio</span>
      </Slogan>
      <EnterButton>
        <Button
          type="primary"
          block
          onClick={() => setIsEnteringCode(!isEnteringCode)}
        >
          Enter with code
        </Button>
      </EnterButton>
    </>
  );
};

export default InvitePage;
