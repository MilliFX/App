import * as React from "react";
import { Daily } from "../../utils/constants";
import { DualAxes } from '@ant-design/charts';

interface ChartProps {
  data: Daily[];
}

const Chart = ({ data }: ChartProps) => {
  const equity = data.map((daily)=>{
    return { 
      date: daily.date,
      value: daily.equity,
      label: 'equity'
    }
  })
  const balance = data.map(daily=>{
    return {
      date: daily.date,
      value: daily.balance,
      label: 'balance'
    }
  })
  const newData = [...equity,...balance]
  const config = {
    data: [newData, data],
    height: 400,
    xField: 'date',
    yField: ['value', 'profit'],
    geometryOptions: [
      {
        geometry: 'line',
        padding: 'auto',
        smooth: false,
        seriesField: 'label'
      },
      {
        geometry: 'column',
      },
    ]
  };
  return (
    <>
      {/* <ul>
        {newData.map((daily)=>{
          return (
            <li>
              {daily.date} {daily.value} {daily.label}
            </li>
          )
        })}
      </ul> */}
      <DualAxes {...config} />
    </>
  );
};

export default Chart;
