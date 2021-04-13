import * as React from "react";
import { Daily } from '../../utils/constants';
import { useEffect, useState,useRef } from 'react';
import { IData, monthEnum} from './typings';
import { Wrapper } from './index.style';
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
  Legend,
  Area
} from "recharts";
import ChartTop from "./components/ChartTop";




interface ChartProps {
  data: Daily[];
}





const XFormat = (data: string) => {
  const dateArr = data.split('/')
  const Month = dateArr[0];
  const Day = dateArr[1];
  const Year = dateArr[2];
  const dateResult = `${Day}${monthEnum[parseInt(Month)]}`
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




  // useEffect(() => {

  //   const DataByMonth: IData[][] = [];

  //   const MonthDataProcess = async () => {

  //     let MonthTemp = 0;
  //     const MonthObj:any[] = [];

  //     data.map((el, index) => {
  //       let Month = parseInt(el.date.slice(0, 2));
  //       if (MonthTemp !== Month) {
  //         MonthObj[Month] = [index];
  //         MonthTemp = Month;
  //         if (MonthObj[Month - 1]) {
  //           MonthObj[Month - 1].push(index - 1);
  //         }
  //       }
  //     })
  //     MonthObj[MonthTemp].push(data.length - 1);

  //     console.log(MonthObj);

  //     MonthObj.map((el: any) => {
  //       if (el[0] === el[1]) {
  //         DataByMonth.push([data[el[0]]]);
  //       } else {
  //         DataByMonth.push(data.slice(el[0], el[1] + 1));
  //       }
  //     })
  //     console.log(DataByMonth);
  //     // setDataMonthly(DataByMonth);
  //   }

  //   MonthDataProcess();

  // }, [])

  

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
    <div>


      <div>
        <ChartTop/>
      </div>

      <Wrapper>
      <ResponsiveContainer height="99%" width="100%">
        <ComposedChart
          data={renderData}
        >
          <CartesianGrid stroke="#f5f5f5" strokeDasharray="3 5" />
          <XAxis dataKey="date" tickFormatter={XFormat} interval="preserveStartEnd"/>
          {/* <XAxis dataKey="date" scale="band" /> */}
          {/* <YAxis tickFormatter={LeftYFormat} hide={true}/> */}
          <YAxis name="1" type='number' domain={['dataMin-500', 'dataMax+500']} tickFormatter={LeftYFormat} hide={true}/>
          {/* <YAxis name="profit" yAxisId="profit" dataKey="profit" orientation="right" type='number' tickFormatter={RightYFormat} /> */}
          <Tooltip active={false} />
          <Legend onClick={(e)=>{console.log(e)}}/>
          {/* <Bar yAxisId="profit" dataKey="profit" barSize={500}>
            {renderData.map((entry) => (
              <Cell
                key={entry.date}
                fill={entry.profit > 0 ? "#A7CF93" : "#D85648"}
              />
            ))}
          </Bar> */}
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#E71F18" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#E71F18" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3FADEC" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#3FADEC" stopOpacity={0}/>
            </linearGradient>
          </defs>

          <Area type="monotone" dataKey="balance" stroke="#E71F18" fillOpacity={1} fill="url(#colorUv)" />
          <Area type="monotone" dataKey="equity" stroke="#3FADEC" fillOpacity={1} fill="url(#colorPv)" />
        </ComposedChart>

      </ResponsiveContainer>
      <div style={{ display: "flex", justifyContent: "space-around", alignItems: 'center' }}>
        <button onClick={handleDurationByDay}>1 W</button>
        <button onClick={() => handleDurationByWeek}>1 M</button>
        <button onClick={handleDurationByMonth}>3 M</button>
      </div>
      </Wrapper>
    </div>
  );
};

export default Chart;
