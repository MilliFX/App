import { Daily } from "../../utils/constants";
import {
  XAxis, // Shows the values on x axis
  YAxis, // Shows the values on y axis
  Hint,
  FlexibleXYPlot,
  LineMarkSeries,
  VerticalBarSeries,
  VerticalGridLines,
  HorizontalGridLines,
  DiscreteColorLegend,
} from "react-vis";
import "../../../node_modules/react-vis/dist/style.css";
// import * as React from "react";

import { useState } from "react";

interface ChartProps {
  data: Daily[];
}

const Chart = ({ data }: ChartProps) => {
  //data for daily
  const dailyData = data.map((daily) => ({
    ...daily,
    date: daily.date.substr(0, 5),
    balance: daily.balance,
    equity: daily.equity,
    profit: daily.profit,
  }));

  const [state, setState] = useState(dailyData);
  const [visi, setVisi] = useState(true);
  const [week, setWeek] = useState([]);
  const [hintValue, setHintValue] = useState<any>();
  const grid=22;
  const palette = [
    "#33cc33",
    "#F15C17",
    "#ff0000",
    "#ffff00",
    "#0066ff",
    "#e0ccff",
    "#ADDDE1",
    "#6b6b76",
  ];
  //mobile responsive
  const maxMobileWidth = 768;
  const chartHeight = 500 > window.innerHeight ? window.innerHeight : 500;
  const chartWidth =
    window.innerWidth > maxMobileWidth
      ? window.innerWidth * 0.8
      : window.innerWidth;
  const tickPadLeft = window.innerWidth > maxMobileWidth ? 0 : -25;
  const tickPadRight = window.innerWidth > maxMobileWidth ? 0 : -2;
  const mobileMargin = window.innerWidth > maxMobileWidth ? 0 : -45;
  const secondY =
    window.innerWidth > maxMobileWidth ? chartWidth * 0.95 : chartWidth * 0.9;
  const tickAngle=window.innerWidth > maxMobileWidth ? 0 : 90;
  const profitMax = state.reduce((prev, current) =>
    prev.profit > current.profit ? prev : current
  ).profit;

  const onValueMouseOut = () => {
    setHintValue(null);
  };

  const onValueMouseOver = (value: any) => {
    setHintValue(value);
  };

  const axisStyle = {
    line: { stroke: palette[6] },
    ticks: { stroke: palette[6] },
    text: { stroke: "none", fill: palette[7], fontWeight: 600 },
  };
  //Data for month
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

  const collection = data.map((daily) => ({
    ...daily,
    date: month[new Date(daily.date).getMonth()],
    balance: daily.balance,
    equity: daily.equity,
    profit: daily.profit,
  }));

  const helper: any = {};
  const monthData = collection.reduce((acc: any, cur: any) => {
    let key: any = cur.date;
    if (!helper[key]) {
      helper[key] = Object.assign({}, cur);
      acc.push(helper[key]);
    } else {
      helper[key].balance += cur.balance;
      helper[key].equity += cur.equity;
      helper[key].profit += cur.profit;
    }
    return acc;
  }, []);

  // console.log(monthData)
  // console.log(collection)
  //Data for week
  const weekData = data.map((daily) => ({
    ...daily,
    date:
      new Date(daily.date).toLocaleDateString("en-US", { weekday: "long" }) ==
      "Monday"
        ? daily.date.substr(0, 5)
        : daily.date,
    balance: daily.balance,
    equity: daily.equity,
    profit: daily.profit,
  }));

  //there must be a better way to rewrite code below
  const myAarray: any = [];

  {
    data.map((daily) => {
      myAarray.push(
        new Date(daily.date).toLocaleDateString("en-US", { weekday: "long" }) ==
          "Monday"
          ? daily.date.substr(0, 5)
          : ""
      );
    });
  }
  const weekAarray: any = [];
  {
    myAarray.map((item: any) => {
      if (item.length > 0) weekAarray.push(item);
    });
  }

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginLeft: mobileMargin,
          zIndex: 1,
        }}
      >
        <FlexibleXYPlot
          xType="ordinal"
          width={chartWidth}
          height={chartHeight}
          colorRange={palette}
        >
          <XAxis
            attr="x"
            attrAxis="y"
            orientation="bottom"
            style={axisStyle}
            tickLabelAngle={tickAngle}
            tickFormat={(d: any) => (d.length > 5 ? "" : d)} 
          />
          <YAxis
            style={axisStyle}
            attr="y"
            attrAxis="x"
            orientation="left"
            tickTotal={5}
            tickPadding={tickPadLeft}
            tickFormat={(d: any) => (d < 1000 ? "$" + d : "$" + d / 1000 + "k")}
            left={0}
          />

          {chartWidth > maxMobileWidth && (
            <VerticalGridLines tickValues={week} left={grid} />
          )}
          <LineMarkSeries
            data={state.map((daily) => ({
              x: daily.date,
              y: daily.equity,
            }))}
            color={palette[2]}
            onValueMouseOut={onValueMouseOut}
            onValueMouseOver={onValueMouseOver}
          />
          <LineMarkSeries
            data={state.map((daily) => ({
              x: daily.date,
              y: daily.balance,
            }))}
            color={palette[3]}
            onValueMouseOut={onValueMouseOut}
            onValueMouseOver={onValueMouseOver}
          />
          <VerticalBarSeries
            barWidth={0.5}
            yDomain={[0, Math.round(profitMax * 1.9)]}
            data={state.map((daily) => ({
              x: daily.date,
              y: daily.profit,
              color: daily.profit > 0 ? 1 : 2,
            }))}
            style={{ opacity: 0.5 }}
            onValueMouseOut={onValueMouseOut}
            onValueMouseOver={onValueMouseOver}
          />
          <YAxis
            style={axisStyle}
            yDomain={[0, Math.round(profitMax * 1.9)]}
            tickPadding={tickPadRight}
            attr="y"
            attrAxis="x"
            orientation="left"
            tickTotal={5}
            tickFormat={(d: any) => (d < 1000 ? "$" + d : "$" + d / 1000 + "k")}
            left={secondY}
          />
          {hintValue ? (
            <Hint value={hintValue}>
              <div style={{ background: palette[5], color: palette[2] }}>
                <p>
                  Date:{hintValue.x}
                  <br />
                  {Math.round(hintValue.y)}
                </p>
              </div>
            </Hint>
          ) : null}
        </FlexibleXYPlot>
      </div>
      <div
        style={{
          background: palette[5],
          color: palette[2],
          textAlign: "center",
          width: chartWidth,
        }}
      >
        <DiscreteColorLegend
          items={[
            { title: "Profit", color: palette[0] },
            { title: "Equity", color: palette[2] },
            { title: "Balance", color: palette[3] },
          ]}
          orientation="horizontal"
        />
        <button
          onClick={() => {
            setState(monthData);
            setVisi(!visi);
          }}
          style={{ visibility: visi ? "visible" : "hidden" }}
        >
          Monthly
        </button>
        <button
          onClick={() => {
            setState(weekData);
            setVisi(!visi);
            setWeek(weekAarray);
          }}
          style={{ visibility: visi ? "visible" : "hidden" }}
        >
          weekly
        </button>
        <br />
        <button
          onClick={() => {
            setState(dailyData);
            setVisi(!visi);
            setWeek([]);
          }}
          style={{ visibility: visi ? "hidden" : "visible" }}
        >
          Go back
        </button>
      </div>
    </>
  );
};

export default Chart;
