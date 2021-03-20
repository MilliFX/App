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
  const [chartData, setChartData] = React.useState(data);

  const sliceChartData = (start: string, end: string) =>{
    const result = data.filter((daily) => {
      return Date.parse(daily.date) > Date.parse(start) && Date.parse(daily.date) < Date.parse(end)
    })
    //console.log(result)
    setChartData(result);
  }


  return (
    <>
      <VictoryChart>
        <VictoryBar
          labelComponent={<VictoryTooltip />}
          barWidth={5}
          style={{ data: { fill: "#a7ce93" } }}
          data={chartData}
          x="date"
          y={(chartData) => chartData.profit * 200}
          labels={(data) => "$" + data.datum.profit.toFixed(2)}
        />
        <VictoryLine
          style={{ data: { stroke: "#de7165", strokeWidth: 1 } }}
          data={chartData}
          x="date"
          y="balance"
        />
        <VictoryScatter
          labelComponent={<VictoryTooltip />}
          style={{ data: { fill: "#de7165" } }}
          size={2}
          data={chartData}
          x="date"
          y="balance"
          labels={(data) => "$" + data.datum.balance.toFixed(2)}
        />
        <VictoryLine
          style={{ data: { stroke: "#f8df93", strokeWidth: 1 } }}
          data={chartData}
          x="date"
          y="equity"
        />
        <VictoryScatter
          labelComponent={<VictoryTooltip />}
          style={{ data: { fill: "#f8df93" } }}
          size={2}
          data={chartData}
          x="date"
          y="equity"
          labels={(data) => "$" + data.datum.equity.toFixed(2)}
        />
        {/* X axis */}
        <VictoryAxis
          style={{ tickLabels: { fontSize: 5 } }}
          standalone={false}
          tickValues={chartData.map(({ date }) => [date])}
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
          style={{ tickLabels: { fontSize: 0 } }}
          standalone={false}
        />
        {/* Y Axis */}
        <VictoryAxis
          dependentAxis
          style={{ tickLabels: { fontSize: 0 } }}
          orientation="right"
        />
      </VictoryChart>

      <button type="button" onClick={()=>sliceChartData("02/01/2021", "02/12/2021")}>Week 1</button>
    </>
  );
};

export default Chart;
