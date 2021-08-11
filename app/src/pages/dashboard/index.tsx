import * as React from "react";
import { Logo } from "./styles";
import "antd/dist/antd.css";
import GreetingCard from "./greetingCard";
import BalanceCard from "./balanceCard";
import OpenTradeCard from "./opentTrade";
import BottomCard from "./bottomCard";
import { DashboardContainer } from "./styles";
const Dashboard = () => {
  return (
    <>
      <DashboardContainer>
        <Logo />
        <GreetingCard />
        <BalanceCard />
        <OpenTradeCard />
        <BottomCard />
      </DashboardContainer>
    </>
  );
};

export default Dashboard;
