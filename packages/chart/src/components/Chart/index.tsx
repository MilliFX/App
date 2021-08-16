import * as React from "react";
import { Daily } from "../../utils/constants";
import AChart from "react-apexcharts";
import { bankersRound } from "bankers-round";
import moment from "moment";

interface ChartProps {
  data: Daily[];
}

const Chart = ({ data }: ChartProps) => {
  const getXaxis = (data: Daily[]) => {
    const xaxis = data.map((item) => moment(item.date).format("DD MMM"));
    return xaxis;
  };
  const getBalance = (data: Daily[]) => {
    const balances = data.map((item) => bankersRound(item.balance, 2));
    return balances;
  };
  const getProfit = (data: Daily[]) => {
    const profits = data.map((item) => bankersRound(item.profit, 2));
    return profits;
  };
  const getEquity = (data: Daily[]) => {
    const equities = data.map((item) => bankersRound(item.equity, 2));
    return equities;
  };
  const options = {
    chart: {
      id: "basic-line",
    },
    colors: ["#E71F18", "#3FADEC"],
    yaxis: {
      labels: {
        show: false,
      },
    },
    xaxis: {
      categories: getXaxis(data),
    },
  };
  const series = [
    {
      name: "Balance",
      data: getBalance(data),
    },
    { name: "Equity", data: getEquity(data) },
  ];
  return (
    <AChart
      options={options}
      series={series}
      type="line"
      width="100%"
      height="600"
    />
  );
};

export default Chart;
