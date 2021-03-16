import * as React from "react";
import { Daily } from "../../utils/constants";
import { DualAxes } from '@ant-design/charts';

interface ChartProps {
  data: Daily[];
}

const month: string[] = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
]

const Chart = ({ data }: ChartProps) => {
  const [interval, setInterval] = React.useState(1)
  var maxColumn: number = data[0].profit
  const handleDuration = (duration:string) => {
    duration === 'week' ? setInterval(5) : duration === 'month' ?
    setInterval(20) : setInterval(1)
  }
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
          size: 4.5,
        },
        
      },
    ],
    xAxis: {
      tickInterval: interval,
      grid: { line: {
        style: { stroke: '#eee' }
      }},
      
    },
    yAxis: [
        {
        min: -maxColumn,
        tickCount: 10,
      }
      
    ],
    meta: {
      date: {
        formatter: function formatter(d:string) {
          const date:Date = new Date(d)
          return `${month[date.getMonth()]} ${date.getDate()}, '${date.getFullYear().toString().slice(2,4)}`
          // return `${month[parseInt(date[0])-1]} ${date[1]}, '${date[2]}`
        }
      }
    }, 
    legend: {

      position: 'bottom',
      // layout: 'horizontal',
    },
    tooltip: {
        showCrosshairs: true,
      crosshairs: {
        type: 'x',
      },
      showMarkers: true,
      marker: {
        symbol: 'circle'
      }
    },
    
  };
  return (
    <>
      <div className="row" style={{ textAlign: 'center' }}>
        <button  type="button" style={{ margin: '10px' }} onClick={()=>handleDuration('day')}>1 Day</button>
        <button  type="button" style={{ margin: '10px' }} onClick={()=>handleDuration('week')}>1 week</button>
        <button  type="button" style={{ margin: '10px' }} onClick={()=>handleDuration('month')}>1 month</button>
      </div>
      
      <DualAxes {...config} />
    </>
  );
};

export default Chart;
