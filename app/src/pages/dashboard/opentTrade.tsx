import * as React from "react";
import { Card, Row, Col, Statistic } from "antd";
import transectionData from "./data";
import DayRow from "../../components/SingleDayRow";
import {
  TradeCard,
  OpenTradeTitle,
  BalanceTitle,
  BalanceValue,
  BalanceUpOrDown,
} from "./styles";
import "antd/dist/antd.css";

const OpenTradeCard = () => {
  return (
    <>
      <TradeCard
        style={{
          width: 320,
          height: 144,
          marginLeft: 20,
          marginTop: 18,
          backgroundColor: "#FFFFFF",
          border: 1,
        }}
      >
        <OpenTradeTitle>Open Trades</OpenTradeTitle>
        <Statistic
          title="Running P/L"
          value={504.0}
          precision={2}
          valueStyle={{ color: "#02C39A", fontSize: 16 }}
          prefix="+ $"
        />
        {/* {transectionData.length > 4
          ? transectionData
              .slice(0, 4)
              .map((date, i) => <DayRow data={date} key={i} />)
          : transectionData.map((date, i) => <DayRow data={date} key={i} />)} */}
      </TradeCard>
    </>
  );
};

export default OpenTradeCard;
