import * as React from "react";
import { Daily } from "../../utils/constants";
import { DualAxes } from '@ant-design/charts';

interface ChartProps {
  data: Daily[];
}

const Chart = ({ data }: ChartProps) => {

  var maxColumn: number = data[0].profit

  // extract equity data
  interface GroupData {
    date: string;
    value: number;
    label: string;
  }

  const equity = data.map((daily:Daily):GroupData=>{
    if (Math.abs(daily.profit) > maxColumn) {
      maxColumn = Math.abs(daily.profit)
    }
    return { 
      date: daily.date,
      value: daily.equity,
      label: 'equity'
    }
  })
  // extract balance data
  const balance = data.map((daily:Daily):GroupData=>{
    return {
      date: daily.date,
      value: daily.balance,
      label: 'balance'
    }
  })
  // merge
  const newData = [...equity,...balance]
  const config = {
    data: [data, newData],
    appendPadding: 30,
    xField: 'date',
    yField: ['profit','value'],
    geometryOptions: [
      {
        geometry: 'column',
      },
      {
        geometry: 'line',
        smooth: false,
        seriesField: 'label',
        color: ['#E85E5E', '#E8C55E'],
        
        point: {
          shape: 'circle',
          // function shape(label:GroupData) {
          //   console.log(label)
          //   return 'circle'
          // },
          size: 4.5,
        
        },
        
      },
    ],
    xAxis: {
      type: 'timeCat',
      grid: { line: {
        style: { stroke: '#eee' }
      }}
    },
    yAxis: [
        {
        min: -maxColumn,
        tickCount: 10,
      }
      
    ],
    // tooltip: {
    //   showCrosshairs: true,
    //   crosshairs: {
    //     type: 'x',
    //   },
    //   showMarkers: true,
    //   marker: {
    //     symbol: 'circle'
    //   }
    // },
   
    // legend: {
    //   layout: 'horizontal',
    //   position: "bottom",
    // },
    
    // interactions: [
    
    //   // {
    //   //   type: 'active-region'
    //   // },
    //   // {
    //   //   type: 'marker-active'
    //   // }
      
    // ]
  };
  return (
    <>
      <DualAxes {...config} />
    </>
  );
};

export default Chart;
