import * as React from "react";
import { Daily, Cross} from "../../utils/constants";
import { useState, useEffect } from "react";
import ChartTop from "./chartTop";
import ChartBottom from "./chartBottom";
import MainChart from "./mainChart";

interface ChartProps {
  data: Daily[];
}

const Chart = ({ data }: ChartProps) => {

  const rawData = data.map((daily) => ({
    ...daily,
    date: new Date(daily.date).toDateString().substr(4, 13),
    balance: daily.balance,
    equity: daily.equity,
    profit: daily.profit / (data[0].balance / 100),
  }));

  const balanceMax = rawData.reduce((prev, current) =>
    prev.balance > current.balance ? prev : current
  ).balance;

  const equityMin = rawData.reduce((prev, current) =>
    prev.equity < current.equity ? prev : current
  ).equity;

  const domain = { start: equityMin * 0.95, end: balanceMax * 1.05 };

  const [state, setState] = useState(
    rawData.length > 7
      ? rawData.slice(rawData.length - 8, rawData.length - 1)
      : rawData
  );

    const onWeekSelected= () => {
      setState(rawData.slice(rawData.length - 8, rawData.length - 1));
    }
    const onMonthSelected= () => {
      setState(rawData.slice(rawData.length - 16, rawData.length - 1));
    }
    const onThreeMonthSelected= () => {
      setState(rawData.slice(rawData.length - 23, rawData.length - 1));
    }
  const [current, setCurrent] = useState({
    date: "Today",
    balance: state[state.length - 1].balance,
    equity: state[state.length - 1].equity,
    profit: state[state.length - 1].profit,
  });

  const [showBalance, setShowBalance] = useState(true);
  const [showEquity, setShowEquity] = useState(true);
  const [startDate, setStartDate] = useState(state[0].date.substr(0, 7));
  const [crosshairValue, setCrosshairValue] = useState<Array<Cross>>([]);;
  const onNearestX = (value: any, { index }: {index:number}) => {
    setCurrent({
      date: state[index].date,
      balance: state[index].balance,
      equity: state[index].equity,
      profit: state[index].profit,
    });
    setCrosshairValue([{
      x: state[index].date
      }
      ])
  };

  const onMouseLeave=() =>{
    setCurrent({
    date: "Today",
    balance: state[state.length - 1].balance,
    equity: state[state.length - 1].equity,
    profit: state[state.length - 1].profit,
  });
   setCrosshairValue([])
}

  const balanceLegend=()=> setShowBalance(!showBalance);
  const equityLegend= () => setShowEquity(!showEquity)

 const animationSetting = {
    domain: domain,
    state: state,
    showEquity: showEquity,
    showBalance: showBalance,
    startDate: startDate,
    crosshairValue:crosshairValue,
  };

  useEffect(() => {
    state.length > 7
      ? setStartDate("")
      : setStartDate(state[0].date.substr(0, 7));
  }, [state]);

  return (
    <>
      <ChartTop data={current} />
      <MainChart
      data={animationSetting}
      onNearestX={onNearestX}
      onMouseLeave={onMouseLeave}
      balanceLegend={balanceLegend}
      equityLegend={equityLegend}
      />
      <ChartBottom
      onWeekSelected={onWeekSelected}
      onMonthSelected={onMonthSelected}
      onThreeMonthSelected={onThreeMonthSelected}
      />
    </>
  );
};

export default Chart;
