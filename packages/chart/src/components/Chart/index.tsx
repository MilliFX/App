import * as React from "react";
import { Daily } from "../../utils/constants";
import AChart from "react-apexcharts";
import { bankersRound } from "bankers-round";
import moment from "moment";
import { useState } from "react";

interface ChartProps {
  data: Daily[];
}

enum Duration {
  week = "week",
  month = "month",
}

const Chart: React.FC<ChartProps> = ({ data }: ChartProps) => {
  const getXaxis = (data: Daily[]) => {
    const xaxis = data.map((item) => moment(item.date).format("DD MMM"));
    return xaxis;
  };
  const getBalance = (data: Daily[]) => {
    const balances = data.map((item) => bankersRound(item.balance, 2));
    return balances;
  };
  const getEquity = (data: Daily[]) => {
    const equities = data.map((item) => bankersRound(item.equity, 2));
    return equities;
  };
  const [options, setOptions] = useState({
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
  });
  const [series, setSeries] = useState([
    {
      name: "Balance",
      data: getBalance(data),
    },
    {
      name: "Equity",
      data: getEquity(data),
    },
  ]);

  const byPeriod = (duration: Duration) => {
    const lastDay = moment(data[data.length - 1].date);
    if (duration === "week") {
      const dayOfWeek = lastDay.day();
      const lastMondayOfWeek = lastDay.subtract(dayOfWeek - 1, "days");
      const weeklyData = data.filter((item) => {
        const day = moment(item.date);
        if (day.diff(lastMondayOfWeek) >= 0) {
          return item;
        }
      });
      setOptions({
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
          categories: getXaxis(weeklyData),
        },
      });
      setSeries([
        {
          name: "Balance",
          data: getBalance(weeklyData),
        },
        {
          name: "Equity",
          data: getEquity(weeklyData),
        },
      ]);
    } else if (duration === "month") {
      const startOfMonth = lastDay.startOf("month");
      const monthlyData = data.filter((item) => {
        const day = moment(item.date);
        if (day.diff(startOfMonth) >= 0) {
          return item;
        }
      });
      setOptions({
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
          categories: getXaxis(monthlyData),
        },
      });
      setSeries([
        {
          name: "Balance",
          data: getBalance(monthlyData),
        },
        {
          name: "Equity",
          data: getEquity(monthlyData),
        },
      ]);
    }
  };
  return (
    <>
      <AChart
        options={options}
        series={series}
        type="line"
        width="100%"
        height="500"
      />
      <button onClick={() => byPeriod(Duration.week)}>W</button>
      <button onClick={() => byPeriod(Duration.month)}>M</button>
    </>
  );
};

export default Chart;
