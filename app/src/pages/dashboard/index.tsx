import * as React from "react";
import { Logo } from "../../components/Logo";
import GreetingCard from "../../components/GreetingCard";
import BalanceCard from "../../components/BalanceCard";
import OpenTradeCard from "../../components/OpenTrade";
import BottomCard from "../../components/BottomCard";
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
