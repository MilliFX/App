import * as React from "react";
import { Daily } from "../../utils/constants";
import { Radio } from "antd";
import { Line } from "@ant-design/charts";
import { DateHeading } from "../CSS/styled_components";

interface ChartProps {
  data: Daily[];
}

interface LineData {
  date: string;
  value: number;
  label: string;
}

const month = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const formatDate = (d: string) => {
  const date = new Date(d);
  return `${date.getDate()} ${month[date.getMonth()]} ${date.getFullYear()}`;
};

const Chart = ({ data }: ChartProps) => {
  const numberOfDays = data.length;
  const isDataLessThenAWeek = numberOfDays < 7;
  const currentDailyDate = data[numberOfDays - 1]
  const [newData, setNewdata] = React.useState(
    isDataLessThenAWeek ? data : data.slice(numberOfDays - 7, numberOfDays)
  );
  const [currentEquity, setCurrentEquity] = React.useState(currentDailyDate.equity);
  const [currentBalance, setCurrentBalance] = React.useState(currentDailyDate.balance);
  const [date, setDate] = React.useState(formatDate(currentDailyDate.date));
  const handleDuration = (e: any) => {
    const duration = e.target.value;
    console.log(duration);
    if (duration === "Week") {
      let weekData = data;
      if (dataLen >= 7) {
        weekData = data.slice(dataLen - 7, dataLen);
      }
      setNewdata(weekData);
    } else if (duration === "Month") {
      let monthData = data;
      if (dataLen >= 30) {
        monthData = data.slice(dataLen - 30, dataLen);
      }
      setNewdata(monthData);
    } else {
      let quarterData = data;
      if (dataLen >= 90) {
        quarterData = data.slice(dataLen - 90, dataLen);
      }
      setNewdata(quarterData);
    }
  };

  // extract equity
  const equity = newData.map(
    (daily: Daily): GroupData => {
      return {
        date: daily.date,
        value: daily.equity,
        label: "equity",
      };
    }
  );

  // extract balance data
  const balance = newData.map(
    (daily: Daily): GroupData => {
      return {
        date: daily.date,
        value: daily.balance,
        label: "balance",
      };
    }
  );

  // merge value
  const yValue = [...equity, ...balance];
  const config = {
    data: yValue,
    padding: "auto" as "auto",
    xField: "date",
    yField: "value",
    seriesField: "label",
    xAxis: {
      type: "timeCat",
    },
    animation: false as false,
    yAxis: {
      nice: true,
      max: Math.max.apply(
        Math,
        yValue.map((item) => {
          return item.value;
        })
      ),
      min: Math.min.apply(
        Math,
        yValue.map((item) => {
          return item.value;
        })
      ),
      tickCount: 5,
    },
    meta: {
      date: {
        formatter: function formatter(d: string) {
          return formatDate(d);
        },
      },
    },
    legend: {
      position: "bottom" as "bottom",
    },
    tooltip: {
      showCrosshairs: true,
      showMarkers: true,
      crosshairs: {
        type: "x" as "x",
      },
      customContent: () => null as any,
    },
    interactions: [{ type: "marker-active" }, { type: "element-active" }],
  };

  const dataChange = (line: any) => {
    line.on("tooltip:change", (evt: any) => {
      const { title, items } = evt.data;
      // const tooltipItems = data.filter((d) => d.date === title);
      setEquity(
        items.find((item: any) => item.data.label === "equity").data.value
      );
      setBalance(
        items.find((item: any) => item.data.label === "balance").data.value
      );
      setDate(title);
    });
  };

  return (
    <>
      <DateHeading>{date}</DateHeading>
      <br />
      <div className="row">
        <div className="col" style={{ display: "inline-block", width: "50%" }}>
          <h3 style={{ color: "grey" }}>Equity</h3>
          <h2>${curEqt.toLocaleString()}</h2>
        </div>
        <div className="col" style={{ display: "inline-block", width: "50%" }}>
          <h3 style={{ color: "grey" }}>Balance</h3>
          <h2>${curBal.toLocaleString()}</h2>
        </div>
        <div>
          <h3 style={{ color: "grey" }}>Profit</h3>
          <h2 style={{ color: "orange" }}>
            {(((curBal - curEqt) / curBal) * 100).toFixed(2)}%
          </h2>
        </div>
      </div>
      <br />
      <Line
        {...config}
        onReady={(line) => {
          dataChange(line);
        }}
      />
      <div style={{ textAlign: "center", margin: "auto" }}>
        <Radio.Group
          buttonStyle="solid"
          size="large"
          defaultValue="Week"
          onChange={handleDuration}
        >
          <Radio.Button value="Week">1W</Radio.Button>
          <Radio.Button value="Month">1M</Radio.Button>
          <Radio.Button value="Quarter">3M</Radio.Button>
        </Radio.Group>
      </div>
    </>
  );
};

export default Chart;
