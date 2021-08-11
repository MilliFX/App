import * as React from "react";
import { Typography } from "antd";
import { CustomCard, BottomCardContent, TinyRectangle1 } from "./styles";
import "antd/dist/antd.css";

const bottom = {
  cardBackGroundColor: "#261058",
  firstPara: `Psst, all of these could be yours!`,
  secondPara: `This is a taste of what your portfolio could be under our management. Be the first to be notified for when we launch.`,
};

const BottomCard = () => {
  return (
    <>
      <CustomCard
        style={{
          width: 320,
          height: 158,
          marginLeft: 20,
          marginTop: 12,
          backgroundColor: bottom.cardBackGroundColor,
          border: 1,
        }}
      >
        <TinyRectangle1 />
        <Typography>
          <BottomCardContent>{bottom.firstPara}</BottomCardContent>
        </Typography>
        <Typography>
          <BottomCardContent>{bottom.secondPara}</BottomCardContent>
        </Typography>
      </CustomCard>
    </>
  );
};

export default BottomCard;
