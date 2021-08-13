import * as React from "react";
import { Typography } from "antd";
import { CustomCard, GreetingCardTitle, GreetingCardContent } from "./styles";

const config = {
  CardBackgroundColor: "#F2FAFE",
  borderStyle: "solid",
  borderColor: "#3FADEC",
  FirstPara: `Howdy 👋`,
  SecondPara: `We are MilliFX, a personal forex management platform. We are currently
in development, but you can register to be notified of when we launch!`,
};

const GreetingCard = () => {
  return (
    <>
      <CustomCard
        style={{
          width: 320,
          height: 144,
          marginLeft: 20,
          marginTop: 18,
          marginBottom: 12,
          backgroundColor: config.CardBackgroundColor,
          border: 1,
          borderStyle: config.borderStyle,
          borderColor: config.borderColor,
          borderRadius: 2,
        }}
      >
        <Typography>
          <GreetingCardTitle>{config.FirstPara}</GreetingCardTitle>
        </Typography>
        <Typography>
          <GreetingCardContent>{config.SecondPara}</GreetingCardContent>
        </Typography>
      </CustomCard>
    </>
  );
};

export default GreetingCard;
