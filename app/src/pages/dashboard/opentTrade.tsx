import * as React from "react";
import { Statistic } from "antd";
import transectionData from "./data";
import DayRow from "../../components/SingleDayRow";
import { TradeCard, OpenTradeTitle } from "./styles";
import "antd/dist/antd.css";

const Trade = {
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
          backgroundColor: Trade.CardBackGroundColor,
          border: 1,
        }}
      >
        <OpenTradeTitle>{Trade.CardTitle}</OpenTradeTitle>
        <Statistic
          title={Trade.RunningTitle}
          value={504.0}
          precision={2}
          valueStyle={{ color: Trade.RunningColor, fontSize: 16 }}
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
