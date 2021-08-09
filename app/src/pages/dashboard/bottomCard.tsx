import * as React from "react";
import { Typography } from "antd";
import { CustomCard, BottomCardContent } from "./styles";
import "antd/dist/antd.css";
const bottomCardTitle = `Psst, all of these could be yours!`;
const bottomCardContent = `This is a taste of what your portfolio could be under our management. Be the first to be notified for when we launch.`;
const BottomCard = () => {
  return (
    <>
      <CustomCard
        style={{
          width: 320,
          height: 144,
          marginLeft: 20,
          marginTop: 18,
          backgroundColor: "#261058",
          border: 1,
        }}
      >
        <Typography>
          <BottomCardContent>{bottomCardTitle}</BottomCardContent>
        </Typography>
        <Typography>
          <BottomCardContent>{bottomCardContent}</BottomCardContent>
        </Typography>
      </CustomCard>
    </>
  );
};

export default BottomCard;
