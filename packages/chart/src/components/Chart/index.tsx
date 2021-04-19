import * as React from "react";
import { Daily } from "../../utils/constants";

interface ChartProps {
  data: Daily[];
}

const Chart = ({ data }: ChartProps) => {
  
  return (
    <>
      <p>Convert the following list to a chart</p>
      <ul>
        {data.map((daily) => {
          return (
            <li>
              {daily.date} {daily.balance} {daily.equity} {daily.profit}
            </li>
          );
        })}
      </ul> </>
  );
};

export default Chart;
