import * as React from "react";
import { Daily } from '../../utils/constants';

import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

interface ChartProps {
  data: Daily[];
}

enum MonthENUM {
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
}

const XFormat = (data: string) => {
  const dateArr = data.split('/')
  const Month = dateArr[0];
  const Day = dateArr[1];
  const Year = dateArr[2];
  // console.log(MonthENUM[parseInt(Month)])
  const dateResult = `${MonthENUM[parseInt(Month)]} ${Day}, '${Year.slice(2,4)}`
  // console.log(dateArr);
  return dateResult;
}


const Chart = ({ data }: ChartProps) => {

  const [duration, setDuration] = React.useState(data)

  const handleDurationChange = (days: number): void => {
    console.log(days);
    const start = data.length - days;
    const end = data.length - 1;
    const newDuration = data.slice(start, end)
    setDuration(newDuration);
  }




  return (
    <>
      {/* <p>Convert the following list to a chart</p> */}
      {/* <ul>
        {data.map((daily) => {
          return (
            <li>
              {daily.date} {daily.balance} {daily.equity} {daily.profit}
            </li>
          );
        })}
      </ul> */}

      <ResponsiveContainer width="100%" height={300}>
        <ComposedChart
          data={duration}
        >
          <CartesianGrid stroke="#f5f5f5" strokeDasharray="3 5" />
          <XAxis dataKey="date" scale="band" tickFormatter={XFormat} />
          <YAxis />
          <YAxis name="profit" yAxisId="profit" dataKey="profit" orientation="right" />
          <Tooltip />
          <Legend />
          <Bar yAxisId="profit" dataKey="profit" barSize={500} fill="#A7CF93"/>
          <Line type="monotoneY" dataKey="balance" stroke="#D85648" />
          <Line type="monotone" dataKey="equity" stroke="#F7D77C" />
        </ComposedChart>
        {/* <button>aaa</button> */}
      </ResponsiveContainer>
      <div style={{ display: "flex", justifyContent: "space-around", alignItems: 'center' }}>
        <button onClick={() => handleDurationChange(7)}>7 Days</button>
        <button onClick={() => handleDurationChange(14)}>14 Days</button>
      </div>

    </>
  );
};

export default Chart;
