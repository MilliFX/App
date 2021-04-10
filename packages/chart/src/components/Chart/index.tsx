import * as React from "react";
import { Daily } from '../../utils/constants';
import { useEffect, useState,useRef } from 'react';
import { IData, monthEnum} from './typings';
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





const XFormat = (data: string) => {
  const dateArr = data.split('/')
  const Month = dateArr[0];
  const Day = dateArr[1];
  const Year = dateArr[2];
  const dateResult = `${monthEnum[parseInt(Month)]} ${Day}, '${Year.slice(2, 4)}`
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


  const [index, setIndex] = useState(0);
  const indexRef = useRef(0);
  const [renderData, setRenderData] = useState(data)
  const [dataMonthly, setDataMonthly] = useState([]);
  const [mbtn, setMbtn] = useState(false);
  // const [wbtn, setWbtn] = useState(false);
  // const [dbtn, setDbtn] = useState(false);




  useEffect(() => {

    const DataByMonth: IData[][] = [];

    const MonthDataProcess = async () => {

      let MonthTemp = 0;
      const MonthObj:any[] = [];

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

      console.log(MonthObj);

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

    
  }, [])

  

  const handleDurationByDay = () => {
    console.log("day")
    setRenderData(data);
  }

  const handleDurationByWeek = () => {
    console.log("week")

  }
  const handleDurationByMonth = () => {
    setMbtn(true);
    setIndex(0);
    setRenderData(dataMonthly[0]);

  }
  const handleMonthChange = (data: string) => {

    if (data === 'next') {
     
      if (indexRef.current < dataMonthly.length-1) {
          indexRef.current  = indexRef.current+1;
          setRenderData(dataMonthly[indexRef.current]);      
      } else {
        alert('this is the most latest month');
      }
     
    } 

    if (data === 'prev') {
      
      console.log(indexRef.current);
      if (indexRef.current > 0) {
          indexRef.current = indexRef.current-1;
          setRenderData(dataMonthly[indexRef.current]);       
      } else {
        alert('this is the most previous month');
      }
    }
  }


  return (
    <div style={}>
      <ResponsiveContainer height="99%" width="100%">
        <ComposedChart
          data={renderData}
        >
          <CartesianGrid stroke="#f5f5f5" strokeDasharray="3 5" />
          <XAxis dataKey="date" scale="band" tickFormatter={XFormat} />
          {/* <YAxis tickFormatter={LeftYFormat}/> */}
          <YAxis name="1" type='number' domain={['dataMin-500', 'dataMax+500']} tickFormatter={LeftYFormat} />
          <YAxis name="profit" yAxisId="profit" dataKey="profit" orientation="right" type='number' tickFormatter={RightYFormat} />
          <Tooltip />
          <Legend />
          <Bar yAxisId="profit" dataKey="profit" barSize={500}>
            {renderData.map((entry) => (
              <Cell
                key={entry.date}
                fill={entry.profit > 0 ? "#A7CF93" : "#D85648"}
              />
            ))}
          </Bar>
          <Line type="monotone" dataKey="balance" stroke="#D85648" onMouseDown={(e:any)=>console.log(e)}/>
          <Line type="monotone" dataKey="equity" stroke="#F7D77C" />
        </ComposedChart>

      </ResponsiveContainer>
      <div style={{ display: "flex", justifyContent: "space-around", alignItems: 'center' }}>
        <button onClick={handleDurationByDay}>By Day</button>
        <button onClick={() => handleDurationByWeek}>By week</button>
        <button style={{ display: mbtn ? 'block' : 'none' }} onClick={() => handleMonthChange('prev')}>
          previous
        </button>
        <button onClick={handleDurationByMonth}>By Month</button>
        <button style={{ display: mbtn ? 'block' : 'none' }} onClick={() => handleMonthChange('next')}>
          next
        </button>
      </div>

    </div>
  );
};

export default Chart;
