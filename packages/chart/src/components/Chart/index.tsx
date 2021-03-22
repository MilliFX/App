import * as React from "react";
import { Daily } from "../../utils/constants";
import { DualAxes } from "@ant-design/charts";

interface ChartProps {
  data: Daily[];
}

interface GroupData {
  date: string;
  value: number;
  label: string;
}

const month: string[] = [
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

const Chart = ({ data }: ChartProps) => {
  const [newData, setNewdata] = React.useState(data);

  // set Data according to duration
  const handleDuration = (duration: string) => {
    if (duration === "Daily") {
      setNewdata(data);
    } else if (duration === "Week") {
      setNewdata(weekData);
    } else {
      setNewdata(monthData);
    }
  };

  var maxColumn: number = data[0].profit;

  // extract week data from daily data
  const weekData = data.filter((daily: Daily) => {
    return new Date(daily.date).getDay() === 1;
  });

  //extract month data from weekData
  const monthData = weekData.reduce(
    (arr, b) => {
      const found = arr.find((a) => a.date.slice(0, 2) === b.date.slice(0, 2));
      if (!found) {
        arr.push(b);
      }
      return arr;
    },
    [weekData[0]]
  );

  // extract equity
  const equity = newData.map(
    (daily: Daily): GroupData => {
      if (daily.profit > maxColumn) {
        maxColumn = daily.profit;
      }
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
    data: [newData, yValue],
    appendPadding: 30,
    xField: "date",
    yField: ["profit", "value"],
    geometryOptions: [
      {
        geometry: "column",
        maxColumnWidth: 20,
      },
      {
        geometry: "line",
        smooth: false,
        seriesField: "label",
        color: ["#E85E5E", "#E8C55E"],

        point: {
          shape: "circle",
          size: 4.5,
        },
      },
    ],
    xAxis: {
      type: "timeCat",
      grid: {
        line: {
          style: { stroke: "#eee" },
        },
      },
    },
    yAxis: [
      {
        min: -maxColumn,
        tickCount: 10,
      },
    ],
    meta: {
      date: {
        formatter: function formatter(d: string) {
          const date = new Date(d);
          return `${
            month[date.getMonth()]
          } ${date.getDate()}, '${date.getFullYear().toString().slice(2, 4)}`;
          // return `${month[parseInt(date[0])-1]} ${date[1]}, '${date[2]}`
        },
      },
    },
    legend: {
      position: "bottom" as "bottom",
      // layout: 'horizontal',
    },
    tooltip: {
      showCrosshairs: true,
      crosshairs: {
        type: "x" as "x",
      },
      showMarkers: true,
      marker: {
        symbol: "circle",
      },
    },
    // interactions: [{ type: "marker-active" }, { type: "brush" }],
  };

  return (
    <>
      {/* {console.log(newData)} */}
      <div className="row" style={{ textAlign: "center" }}>
        <button
          type="button"
          style={{ margin: "10px" }}
          onClick={() => handleDuration("Daily")}
        >
          Day
        </button>
        <button
          type="button"
          style={{ margin: "10px" }}
          onClick={() => handleDuration("Week")}
        >
          Week
        </button>
        <button
          type="button"
          style={{ margin: "10px" }}
          onClick={() => handleDuration("Month")}
        >
          Month
        </button>
      </div>

      <DualAxes {...config} />
    </>
  );
};

export default Chart;
