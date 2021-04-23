import * as React from "react";
import { Daily } from "../../utils/constants";
import { Radio, RadioChangeEvent } from "antd";
import { Line } from "@ant-design/charts";
import { createConfig } from "../../utils/config";
import ChartTop from "./chartTop";
import { Options } from "@ant-design/charts/es/hooks/useChart";
import { RadioStyle } from "../CSS/styled_components";
import {
  ChartProps,
  LineData,
  Duration,
  LABEL_WEEK,
  LABEL_MONTH,
  LABEL_QUARTER,
  formatDate,
} from "../../utils/utils";

const Chart = ({ data }: ChartProps) => {
  const numberOfDays = data.length;
  const isDataLessThenAWeek = numberOfDays < 7;
  const isDataLessThenAMonth = numberOfDays < 30;
  const isDataLessThenAQuarter = numberOfDays < 90;

  const weekData = isDataLessThenAWeek
    ? data
    : data.slice(numberOfDays - 7, numberOfDays);
  const monthData = isDataLessThenAMonth
    ? data
    : data.slice(numberOfDays - 30, numberOfDays);
  const quarterData = isDataLessThenAQuarter
    ? data
    : data.slice(numberOfDays - 90, numberOfDays);

  const currentDailyDate = data[numberOfDays - 1];
  const [newData, setNewdata] = React.useState(weekData);
  const [currentEquity, setCurrentEquity] = React.useState(
    currentDailyDate.equity
  );
  const [currentBalance, setCurrentBalance] = React.useState(
    currentDailyDate.balance
  );
  const [date, setDate] = React.useState(formatDate(currentDailyDate.date));

  const handleDuration = (e: RadioChangeEvent) => {
    const duration = e.target.value;
    setNewdata(
      duration === Duration.Week
        ? weekData
        : duration === Duration.Month
        ? monthData
        : quarterData
    );
  };

  const equityArray = newData.map(
    (daily: Daily): LineData => {
      return {
        date: daily.date,
        value: daily.equity,
        label: "equity",
      };
    }
  );

  const balanceArray = newData.map(
    (daily: Daily): LineData => {
      return {
        date: daily.date,
        value: daily.balance,
        label: "balance",
      };
    }
  );

  const yValue = [...equityArray, ...balanceArray];

  const dataChange = (line: Options) => {
    line.on("tooltip:change", (evt: Options) => {
      const { title, items } = evt.data;
      setCurrentEquity(
        items.find((item: Options) => item.data.label === "equity").data.value
      );
      setCurrentBalance(
        items.find((item: Options) => item.data.label === "balance").data.value
      );
      setDate(title);
    });
  };

  const parameter = {
    date: date,
    equity: currentEquity,
    balance: currentBalance,
    profit: ((currentBalance - currentEquity) / currentBalance) * 100,
  };

  return (
    <>
      <ChartTop {...parameter}></ChartTop>
      <Line
        {...createConfig(yValue)}
        onReady={(line) => {
          dataChange(line);
        }}
      />
      <RadioStyle>
        <Radio.Group
          buttonStyle="solid"
          size="large"
          defaultValue="Week"
          onChange={handleDuration}
        >
          <Radio.Button value={Duration.Week}>{LABEL_WEEK}</Radio.Button>
          <Radio.Button value={Duration.Month}>{LABEL_MONTH}</Radio.Button>
          <Radio.Button value={Duration.Quarter}>{LABEL_QUARTER}</Radio.Button>
        </Radio.Group>
      </RadioStyle>
    </>
  );
};

export default Chart;
