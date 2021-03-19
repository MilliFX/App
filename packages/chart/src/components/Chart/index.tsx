import * as React from "react";
import { Daily } from "../../utils/constants";
import {
  VictoryBar,
  VictoryChart,
  VictoryLine,
  VictoryAxis,
  VictoryTooltip,
  VictoryScatter,
} from "victory";

interface ChartProps {
  data: Daily[];
}

const Chart = ({ data }: ChartProps) => {
  const profit = data.map(({ profit }) => profit);

  const labelRatio = Math.max(...profit) / 6;

  return (
    <>
      <VictoryChart>
        <VictoryBar
          labelComponent={<VictoryTooltip />}
          barWidth={5}
          style={{ data: { fill: "#a7ce93" } }}
          data={data}
          x="date"
          y={(data) => data.profit * 200}
          labels={(data) => "$" + data.datum.profit.toFixed(2)}
        />
        <VictoryLine
          style={{ data: { stroke: "#de7165", strokeWidth: 1 } }}
          data={data}
          x="date"
          y="balance"
        />
        <VictoryScatter
          labelComponent={<VictoryTooltip />}
          style={{ data: { fill: "#de7165" } }}
          size={2}
          data={data}
          x="date"
          y="balance"
          labels={(data) => "$" + data.datum.balance.toFixed(2)}
        />
        <VictoryLine
          style={{ data: { stroke: "#f8df93", strokeWidth: 1 } }}
          data={data}
          x="date"
          y="equity"
        />
        <VictoryScatter
          labelComponent={<VictoryTooltip />}
          style={{ data: { fill: "#f8df93" } }}
          size={2}
          data={data}
          x="date"
          y="equity"
          labels={(data) => "$" + data.datum.equity.toFixed(2)}
        />
        {/* X axis */}
        <VictoryAxis
          style={{ tickLabels: { fontSize: 5 } }}
          standalone={false}
          tickValues={data.map(({ date }) => [date])}
          tickFormat={(date) => {
            const d = new Date(date);
            if (d.getDay() === 1) {
              return d.toISOString().split("T")[0];
            } else {
              return "";
            }
          }}
        />

        {/* Y axis */}
        <VictoryAxis
          dependentAxis
          orientation="left"
          style={{ tickLabels: { fontSize: 5 } }}
          standalone={false}
        />
        {/* Y Axis */}
        <VictoryAxis
          dependentAxis
          style={{ tickLabels: { fontSize: 5 } }}
          orientation="right"
        />
      </VictoryChart>
    </>
  );
};

export default Chart;
