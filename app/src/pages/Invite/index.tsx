import React, { useState } from "react";
import { ReactComponent as BrandSVG } from "../../img/branding.svg";
import InviteForm from "../../components/Invitation/InviteForm";
import InvitePage from "../../components/Invitation/InvitePage";
import { Brand, Wrapper } from "./index.style";

export const Invite = () => {
  const [isEnteringCode, setIsEnteringCode] = useState(true);
  return (
    <Wrapper>
      <Brand>
        <BrandSVG />
      </Brand>
      {isEnteringCode ? (
        <InvitePage
          isEnteringCode={isEnteringCode}
          setIsEnteringCode={setIsEnteringCode}
        />
      ) : (
        <InviteForm
          isEnteringCode={isEnteringCode}
          setIsEnteringCode={setIsEnteringCode}
        />
      )}
    </Wrapper>
  );
};

