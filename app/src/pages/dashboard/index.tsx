import * as React from "react";
import { Logo } from "./styles";
import "antd/dist/antd.css";
import GreetingCard from "./greetingCard";
import BalanceCard from "./balanceCard";
import OpenTradeCard from "./opentTrade";
import BottomCard from "./bottomCard";

const Dashboard = () => {
  return (
    <>
      <Logo />
      <GreetingCard />
      <BalanceCard />
      <OpenTradeCard />
      <BottomCard />
    </>
  );
};

export default Dashboard;
