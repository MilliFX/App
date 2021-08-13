import * as React from "react";
import { Typography } from "antd";
import { CustomCard, BottomCardContent, TinyRectangle1 } from "./styles";

const config = {
  cardBackGroundColor: "#261058",
  firstPara: `Psst, all of these could be yours!`,
  secondPara: `This is a taste of what your portfolio could be under our management. Be the first to be notified for when we launch.`,
};

const BottomCard = () => {
  return (
    <CustomCard
      style={{
        width: 320,
        height: 158,
        marginLeft: 20,
        marginTop: 12,
        backgroundColor: config.cardBackGroundColor,
        border: 1,
      }}
    >
      <TinyRectangle1 />
      <Typography>
        <BottomCardContent>{config.firstPara}</BottomCardContent>
      </Typography>
      <Typography>
        <BottomCardContent>{config.secondPara}</BottomCardContent>
      </Typography>
    </CustomCard>
  );
};

export default BottomCard;
