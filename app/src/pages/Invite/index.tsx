import React, { useState } from "react";
import { ReactComponent as BrandSVG } from "../../img/branding.svg";
import InviteForm from "./InviteForm";
import InvitePage from "./InvitePage";
import { Brand, SVGWrapper } from "./styledComponent";

export const Invite = () => {
  const [isEnteringCode, setIsEnteringCode] = useState(true);
  return (
    <SVGWrapper>
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
    </SVGWrapper>
  );
};

