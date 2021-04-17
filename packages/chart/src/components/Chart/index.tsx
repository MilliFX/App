import * as React from "react";
import { Daily } from '../../utils/constants';
import { useEffect, useState,useRef } from 'react';
import { IData, monthEnum, Duration} from './typings';
import { Wrapper ,LegendTool, LegendItem,Button} from './index.style';
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




interface ChartProps {
  data: Daily[];
}

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





const filterDate = (data:Daily[],date:string)=>{
  return data.find(data=>data.date===date)

}




const Chart = ({ data }: ChartProps) => {



  const [renderData, setRenderData] = useState(data);



  const [balanceVisable,setBalanceVisable] = useState(true);
  const [equityVisable,setEquityVisable] = useState(true);
  const initialTopData = data[data.length-1]
  const [topData,setTopdata] = useState(initialTopData);
  const [duration,setDuration] = useState('3M');
  
  

  
  
  // const handleToolTip = (value, name, props)=>{
  //   console.log(value);
  //   console.log(name);
  //   console.log(props);
  // }

  const customizedContent = (e)=>{
    // setTimeout(() => {
    //   console.log(e['label']);
    // }, 3000);
    
    const topData = filterDate(renderData,e['label'])
    // console.log(topData);
   
    
    return '';
  }

  const handleDuration = (time:number)=>{
    // console.log(time);
    const tempData = data.slice(-time);
    setDuration(Duration[time]);
    setRenderData(tempData);
  }

  const handleLegend = (e)=>{
    const type:string = e;
  
    if(type==="balance"){
      if(equityVisable){
        setBalanceVisable(!balanceVisable)
      }
    }else{
      if(balanceVisable){
        setEquityVisable(!equityVisable)
      } 
    }
  }

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


  return (
    <>
      <div>
        <ChartTop props={topData}/>
      </div>

      <Wrapper>
      <ResponsiveContainer height="99%" width="100%">
        <ComposedChart
          data={renderData}
        >
          <CartesianGrid stroke="#f5f5f5" strokeDasharray="3 5" />
          {/* <XAxis dataKey="date" tickFormatter={XFormat} interval="preserveStartEnd"/> */}
          <XAxis dataKey="date" scale="band" />
          {/* <YAxis tickFormatter={LeftYFormat} hide={true}/> */}
          <YAxis name="1" type='number' domain={['dataMin-500', 'dataMax+500']} tickFormatter={LeftYFormat} hide={true}/>
          {/* <YAxis name="profit" yAxisId="profit" dataKey="profit" orientation="right" type='number' tickFormatter={RightYFormat} /> */}
         
            <Tooltip content={customizedContent} /> 
          
          
          {/* <Legend iconSize={20} iconType="line" onClick={handleLegend} /> */}
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
              <stop offset="1%" stopColor="#E71F18" stopOpacity={0.2}/>
              <stop offset="99%" stopColor="#E71F18" stopOpacity={0.1}/>
            </linearGradient>
            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="1%" stopColor="#3FADEC" stopOpacity={0.2}/>
              <stop offset="99%" stopColor="#3FADEC" stopOpacity={0.1}/>
            </linearGradient>
          </defs>

          {balanceVisable? <Area type="monotone" dataKey="balance" stroke="#E71F18" fillOpacity={1} fill="url(#colorUv)" />:null}
          {equityVisable?<Area type="monotone" dataKey="equity" stroke="#3FADEC" fillOpacity={1} fill="url(#colorPv)" />:null}
          </ComposedChart>

      </ResponsiveContainer>
      <LegendTool>
        <LegendItem color={balanceVisable?"#E71F18":"#ADADAD"} onClick={()=>handleLegend('balance')}> ---- Balance</LegendItem>
        <LegendItem color={equityVisable?"#3FADEC":"#ADADAD"} onClick={()=>handleLegend('equity')}> ---- Equity</LegendItem>
      </LegendTool>
      <div style={{ display: "flex", justifyContent: "space-around", alignItems: 'center' }}>
        <Button background={duration===Duration[7]?'#E7EBEF':'white'} color={duration===Duration[7]?'black':'red'} onClick={()=>handleDuration(Duration['1W'])}>1 W</Button>
        <Button background={duration===Duration[30]?'#E7EBEF':'white'} color={duration===Duration[30]?'black':'red'} onClick={()=>handleDuration(Duration['1M'])}>1 M</Button>
        <Button background={duration===Duration[90]?'#E7EBEF':'white'} color={duration===Duration[90]?'black':'red'} onClick={()=>handleDuration(Duration['3M'])}>3 M</Button>  
        {/* <button onClick={()=>handleDuration(Duration['1W'])}>1 W</button>
        <button onClick={()=>handleDuration(Duration['1M'])}>1 M</button>
        <button onClick={()=>handleDuration(Duration['3M'])}>3 M</button> */}
      </div>
      </Wrapper>
    </>
  );
};

export default Chart;




// const handleMonthChange = (data: string) => {

//   if (data === 'next') {
   
//     if (indexRef.current < dataMonthly.length-1) {
//         indexRef.current  = indexRef.current+1;
//         setRenderData(dataMonthly[indexRef.current]);      
//     } else {
//       alert('this is the most latest month');
//     }
   
//   } 

//   if (data === 'prev') {
    
//     console.log(indexRef.current);
//     if (indexRef.current > 0) {
//         indexRef.current = indexRef.current-1;
//         setRenderData(dataMonthly[indexRef.current]);       
//     } else {
//       alert('this is the most previous month');
//     }
//   }
// }