import * as React from "react";
import { Daily } from '../../utils/constants';
import { useEffect, useState } from 'react';
import { monthEnum, Duration ,ChartProps} from './typings';
import { Wrapper, LegendTool, LegendItem, Button } from './index.style';
import {
  ResponsiveContainer,
  ComposedChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Area
} from "recharts";
import ChartTop from "./components/ChartTop";


const XFormat = (data: string) => {
  const dateArr = data.split('/')
  const Month = dateArr[0];
  const Day = dateArr[1];
  // const Year = dateArr[2];
  const dateResult = `${Day}${monthEnum[parseInt(Month)]}`
  return dateResult;
}

const LeftYFormat = (data: number): string => {
  const dataStr = data.toFixed(0);
  return `$${dataStr.substr(0, dataStr.length - 3)}K`;
}

const filterDate = (data: Daily[], date: string) => {
  return data.find(data => data.date === date)
}




const Chart = ({ data }: ChartProps) => {

  const [renderData, setRenderData] = useState(data);
  const [balanceVisable, setBalanceVisable] = useState(true);
  const [equityVisable, setEquityVisable] = useState(true);
  const initialTopData = data[data.length - 1]
  const [topData, setTopdata] = useState(initialTopData);
  const [duration, setDuration] = useState('3M');


  

  const handleDuration = (time: number) => {
    // console.log(time);
    const tempData = data.slice(-time);
    setDuration(Duration[time]);
    setRenderData(tempData);
  }

  const handleLegend = (e) => {
    const type: string = e;
    if (type === "balance") {
      if (equityVisable) {
        setBalanceVisable(!balanceVisable)
      }
    } else {
      if (balanceVisable) {
        setEquityVisable(!equityVisable)
      }
    }
  }


  const customizedContent = (e) => {
    // setTimeout(() => {
    //   console.log(e['label']);
    // }, 3000);
    const topData = filterDate(renderData, e['label'])
    // console.log(topData);
    return '';
  }


  return (
    <>
      <div>
        <ChartTop props={topData} />
      </div>

      <Wrapper>
        <ResponsiveContainer height="99%" width="100%">
          <ComposedChart
            data={renderData}
          >
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="1%" stopColor="#E71F18" stopOpacity={0.2} />
                <stop offset="99%" stopColor="#E71F18" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="1%" stopColor="#3FADEC" stopOpacity={0.2} />
                <stop offset="99%" stopColor="#3FADEC" stopOpacity={0.1} />
              </linearGradient>
            </defs>


            {/* <CartesianGrid stroke="#f5f5f5" strokeDasharray="3 5" /> */}
            {/* <XAxis dataKey="date" tickFormatter={XFormat} interval="preserveStartEnd"/> */}
            <XAxis dataKey="date" scale="band" />
            <YAxis name="1" type='number' domain={['dataMin-500', 'dataMax+500']} tickFormatter={LeftYFormat} hide={true} />
            <Tooltip content={customizedContent} />

            

            {balanceVisable ? <Area type="monotone" dataKey="balance" stroke="#E71F18" fillOpacity={1} fill="url(#colorUv)" /> : null}
            {equityVisable ? <Area type="monotone" dataKey="equity" stroke="#3FADEC" fillOpacity={1} fill="url(#colorPv)" /> : null}
          </ComposedChart>
        </ResponsiveContainer>

        <LegendTool>
          <LegendItem color={balanceVisable ? "#E71F18" : "#ADADAD"} onClick={() => handleLegend('balance')}> ---- Balance</LegendItem>
          <LegendItem color={equityVisable ? "#3FADEC" : "#ADADAD"} onClick={() => handleLegend('equity')}> ---- Equity</LegendItem>
        </LegendTool>
        <div style={{ display: "flex", justifyContent: "space-around", alignItems: 'center' }}>
          <Button background={duration === Duration[7] ? '#E7EBEF' : 'white'} color={duration === Duration[7] ? 'black' : 'red'} onClick={() => handleDuration(Duration['1W'])}>1 W</Button>
          <Button background={duration === Duration[30] ? '#E7EBEF' : 'white'} color={duration === Duration[30] ? 'black' : 'red'} onClick={() => handleDuration(Duration['1M'])}>1 M</Button>
          <Button background={duration === Duration[90] ? '#E7EBEF' : 'white'} color={duration === Duration[90] ? 'black' : 'red'} onClick={() => handleDuration(Duration['3M'])}>3 M</Button>

        </div>
      </Wrapper>
    </>
  );
};

export default Chart;


