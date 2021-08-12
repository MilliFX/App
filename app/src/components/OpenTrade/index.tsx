import * as React from "react";
import { Statistic } from "antd";
import transectionData from "../../pages/dashboard/data";
import DayRow from "../SingleDayRow";
import { TradeCard, OpenTradeTitle } from "./styles";
import "antd/dist/antd.css";

const config = {
  CardTitle: "Open Trades",
  CardBackGroundColor: "#FFFFFF",
  RunningTitle: "Running P/L",
  RunningColor: "#02C39A",
};

const OpenTradeCard = () => {
  return (
    <>
      <TradeCard
        style={{
          width: 320,
          height: 351,
          marginLeft: 20,
          marginTop: 12,
          backgroundColor: config.CardBackGroundColor,
          border: 1,
        }}
      >
        <OpenTradeTitle>{config.CardTitle}</OpenTradeTitle>
        <Statistic
          title={config.RunningTitle}
          value={504.0}
          precision={2}
          valueStyle={{ color: config.RunningColor, fontSize: 16 }}
          prefix="+ $"
        />
        {transectionData.length > 1
          ? transectionData
              .slice(0, 1)
              .map((date, i) => <DayRow data={date} key={i} />)
          : transectionData.map((date, i) => <DayRow data={date} key={i} />)}
      </TradeCard>
    </>
  );
};

export default OpenTradeCard;
