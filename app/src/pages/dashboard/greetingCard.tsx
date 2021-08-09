import * as React from "react";
import { Typography } from "antd";
import { CustomCard, GreetingCardTitle, GreetingCardContent } from "./styles";
import "antd/dist/antd.css";
const greetingCardFirstLine = `Howdy 👋`;
const greetingCardSecondLine = `We are MilliFX, a personal forex management platform. We are currently
in development, but you can register to be notified of when we launch!`;

const GreetingCard = () => {
  return (
    <>
      <CustomCard
        style={{
          width: 320,
          height: 144,
          marginLeft: 20,
          marginTop: 18,
          backgroundColor: "#F2FAFE",
          border: 1,
        }}
      >
        <Typography>
          <GreetingCardTitle>{greetingCardFirstLine}</GreetingCardTitle>
        </Typography>
        <Typography>
          <GreetingCardContent>{greetingCardSecondLine}</GreetingCardContent>
        </Typography>
      </CustomCard>
    </>
  );
};

export default GreetingCard;
