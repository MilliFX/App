import React from "react";
import { Slogan, EnterButton } from "../../pages/Invite/index.style";
import { Button } from "../Button/index.stories";
import { InviteCodeProps } from "../../pages/Invite/types";

const InvitePage: React.FC<InviteCodeProps> = ({
  isEnteringCode,
  setIsEnteringCode,
}: InviteCodeProps) => {
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
