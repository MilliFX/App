import * as React from "react";
import { Daily } from '../../utils/constants';
import { useEffect, useState } from 'react';

import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Bar,
  Cell,
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
  'Jan' = 1,
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
  const dateResult = `${MonthENUM[parseInt(Month)]} ${Day}, '${Year.slice(2, 4)}`
  return dateResult;
}

const LeftYFormat = (data: number): string => {
  const dataStr = data.toFixed(0);
  return `$${dataStr.substr(0, dataStr.length - 3)}K`;
}
const RightYFormat = (data: number): any => {
  return `$${data}`

}

const Chart = ({ data }: ChartProps) => {



  const [renderData, setRenderData] = useState(data)
  const [dataMonthly, setDataMonthly] = useState<any>([])
  const [mbtn,setMbtn] = useState(false);
  const [wbtn,setWbtn] = useState(false);
  const [dbtn,setDbtn] = useState(false);




  useEffect(() => {

    const DataByMonth: any = [];
    // const DataByWeek = [];

    const MonthDataProcess = async () => {
      
      let MonthTemp = 0;
      let MonthObj: any = [];
      
      data.map((el, index) => {
        let Month = parseInt(el.date.slice(0, 2));
        if (MonthTemp !== Month) {
          MonthObj[Month] = [index];
          MonthTemp = Month;
          if (MonthObj[Month - 1]) {
            MonthObj[Month - 1].push(index - 1);
          }
        }
      })
      MonthObj[MonthTemp].push(data.length - 1);

      MonthObj.map((el: any) => {
        if (el[0] === el[1]) {
          DataByMonth.push([data[el[0]]]);
        } else {
          DataByMonth.push(data.slice(el[0], el[1] + 1));
        }
      })
      console.log(DataByMonth);
      setDataMonthly(DataByMonth);
    }
    MonthDataProcess();

    console.log(dataMonthly);

  }, [])

  // const [duration, setDuration] = React.useState(data);




  let RenderData = data;



  const handleYDurationChange = (days: number): void => {
    console.log(days);
    const start = data.length - days;
    const end = data.length - 1;
    const newDuration = data.slice(start, end)
    // setDuration(newDuration);
  }

  const handleDurationByDay = () => {
    console.log("day")
    RenderData = data;
  }

  const handleDurationByWeek = () => {
    console.log("week")

  }
  const handleDurationByMonth = () => {
    setMbtn(true);
    console.log("week");

  }


  // const TempA = (data: any) => {
  //   return data.height > 0 ? { ...data, fill: "#A7CF93" } : { ...data, fill: "#D85648" }
  // }

  // const handleDurationByMonth = () => {

  //   console.log("month")
  //   if (true) {
  //     RenderData.map((el) => {
  //       el.date.split('/')
  //     })
  //   }
  // }


  return (
    <div style={{ width: '100%', height: 500 }}>
      <ResponsiveContainer height="99%" width="100%">
        <ComposedChart
          data={RenderData}
        >
          <CartesianGrid stroke="#f5f5f5" strokeDasharray="3 5" />
          <XAxis dataKey="date" scale="band" tickFormatter={XFormat} />
          {/* <YAxis tickFormatter={LeftYFormat}/> */}
          <YAxis name="1" type='number' domain={['dataMin-500', 'dataMax+500']} tickFormatter={LeftYFormat} />
          <YAxis name="profit" yAxisId="profit" dataKey="profit" orientation="right" type='number' tickFormatter={RightYFormat} />
          <Tooltip />
          <Legend />
          <Bar yAxisId="profit" dataKey="profit" barSize={500}>
            {RenderData.map((entry) => (
              <Cell
                key={entry.date}
                fill={entry.profit > 0 ? "#A7CF93" : "#D85648"}
              />
            ))}
          </Bar>
          <Line type="monotone" dataKey="balance" stroke="#D85648" />
          <Line type="monotone" dataKey="equity" stroke="#F7D77C" />
        </ComposedChart>

      </ResponsiveContainer>
      <div style={{ display: "flex", justifyContent: "space-around", alignItems: 'center' }}>
        <button onClick={handleDurationByDay}>By Day</button>
        <button onClick={() => handleDurationByWeek}>By week</button>
        <button style={{display:mbtn?'block':'none'}}>
          previous
        </button>
        <button onClick={handleDurationByMonth}>By Month</button>
        <button style={{display:mbtn?'block':'none'}}>
          next
        </button>
      </div>

    </div>
  );
};

export default Chart;
