import * as React from "react";
import { Daily } from "../../utils/constants";
import "./index.css";
import AChart from "react-apexcharts";

interface ChartProps {
  data: Daily[];
}

const Chart = ({ data }: ChartProps) => {
  //1. Manage Data Part
  //check mockDataLength
  const dataLength = data.length;
  //sort data by date

  //2. Config chart design part
  //2.1 Apexchart basic configuration
  const options = {};
  const series = data;

  return (
    <div className="apexchartContainer">
      <div>title</div>
      <div>
        <AChart options={options} series={series} type="line" height={350} />
      </div>
    </div>
  );
};

export default Chart;

// interface ChartProps {
//   data: Daily[];
// }
// interface SeriesData{
//   name:string,
//   type:string,
//   data: number[]
// }

// type MyState = {
//   series: SeriesData[]
//   options: any
// }
// class Chart extends React.Component< {data: ChartProps} > {

//   state: MyState = {
//     series: [],
//     options: {
// chart: {},
// stroke: {},
// title: {},
// dataLabels: {},
// labels: [],
// xaxis: {},
// yaxis: [],
// fill:{
//   type:'gradient',
//   gradient:{
//     shade:'dark',
//     type:"horizontal",
//     shadeIntensity:0.5,
//     gradientToColors:undefined,
//     inverseColors:true,
//     opacityForm:1,
//     opacityTo:1,
//     stops:[0,50,100],
//     colorStoprs:[]
//   }
//       },
//       theme:{
//         palette:'palette1'
//       }
//     },
//   }

//   fetchDay =()=>{
//     // console.log(this.props.data)
//     const eqarray:number[] = []
//     const baarray:number[] = []
//     const prarray:number[] = []
//     const daarray:string[] = []
//     const eqdata = this.props.data.map(
//       (daily)=>{
//         // return{
//         //   data: daily.equity
//         // }
//         const equityGrowth = Number(Number(daily.equity)/30000-1).toFixed(2)
//         const balanceGrowth = Number(Number(daily.balance)-30000).toFixed(2)
//         const dailyProfit = Number(daily.profit).toFixed(2)
//         eqarray.push(Number(equityGrowth))
//         baarray.push(Number(balanceGrowth))
//         prarray.push(Number(dailyProfit))
//         daarray.push(daily.date)
//       }
//     )
//     // console.log(eqarray)

//     this.setState({
//       series: [
//         {
//           name: "Profit",
//           type: "column",
//           data: prarray,
//         },
//         {
//           name: "Growth",
//           type: "line",
//           data: baarray,
//         },
//         {
//           name: "Equity Growth",
//           type: "line",
//           data: eqarray,
//         },
//       ],
//       options: {
//         plotOptions:{
//           area:{
//             fillTo:'origin',
//           }
//         },
//         chart: {
//           height: 350,
//           type: "line",
//         },
//         stroke: {
//           width: [0, 4],
//         },
//         title: {
//           text: "Millifx ApexChart Demo",
//         },
//         dataLabels: {
//           enabled: true,
//           enabledOnSeries: [1],
//         },
//         labels: daarray,
//         xaxis: {
//           type: "datetime",
//         },
//         yaxis: [
//           {
//             title: {
//               text: "Profit",
//             },
//           },
//           {
//             opposite: true,
//             title: {
//               text: "Growth",
//             },
//           },
//         ],
//       },
//     });
//   }
//   fetchWeek =()=>{
//     // console.log(this.props.data)
//     const eqarray:number[] = []
//     const baarray:number[] = []
//     const prarray:number[] = []
//     const daarray:string[] = []
//     const equityarray:number[] = []
//     const balancearray:number[] = []
//     const profitarray:number[] = []

//     const eqdata = this.props.data.map(
//       (daily)=>{
//         // return{
//         //   data: daily.equity
//         // }
//         const equityGrowth = Number(Number(daily.equity)/30000-1).toFixed(2)
//         const balanceGrowth = Number(Number(daily.balance)-30000).toFixed(2)
//         const dailyProfit = Number(daily.profit).toFixed(2)
//         daarray.push(daily.date)
//         eqarray.push(Number(equityGrowth))
//         baarray.push(Number(balanceGrowth))
//         prarray.push(Number(dailyProfit))
//       }
//     )
//     console.log(baarray)
//     eqarray.shift()
//     baarray.shift()
//     prarray.shift()
//     console.log(baarray)
//     let eqsum = 0
//     let basum = 0
//     let prosum = 0
//     for(let i = 0; i<5;i++){
//       eqsum += eqarray[i]
//       basum += baarray[i]
//       prosum += prarray[i]
//     }
//     equityarray.push(eqsum)
//     balancearray.push(basum)
//     profitarray.push(prosum)
//     for(let i = 5; i<10 ;i++){
//       eqsum += eqarray[i]
//       basum += baarray[i]
//       prosum += prarray[i]
//     }
//     equityarray.push(eqsum)
//     balancearray.push(basum)
//     profitarray.push(prosum)
//     for(let i = 10; i<15 ;i++){
//       eqsum += eqarray[i]
//       basum += baarray[i]
//       prosum += prarray[i]
//     }
//     equityarray.push(eqsum)
//     balancearray.push(basum)
//     profitarray.push(prosum)
//     for(let i = 15; i<20 ;i++){
//       eqsum += eqarray[i]
//       basum += baarray[i]
//       prosum += prarray[i]
//     }
//     equityarray.push(eqsum)
//     balancearray.push(basum)
//     profitarray.push(prosum)
//     for(let i = 20; i<24 ;i++){
//       eqsum += eqarray[i]
//       basum += baarray[i]
//       prosum += prarray[i]
//     }
//     equityarray.push(eqsum)
//     balancearray.push(basum)
//     profitarray.push(prosum)
//     console.log(equityarray)

//     this.setState({
//       series: [
//         {
//           name: "Profit",
//           type: "column",
//           data: profitarray,
//         },
//         {
//           name: "Growth",
//           type: "line",
//           data: balancearray,
//         },
//         {
//           name: "Equity Growth",
//           type: "line",
//           data: equityarray,
//         },
//       ],
//       options: {
//         chart: {
//           height: 350,
//           type: "line",
//         },
//         stroke: {
//           width: [0, 4],
//         },
//         title: {
//           text: "Millifx ApexChart Demo",
//         },
//         dataLabels: {
//           enabled: true,
//           enabledOnSeries: [1],
//         },
//         labels: {daarray},
//         xaxis: {
//           type: "datetime",
//         },
//         yaxis: [
//           {
//             title: {
//               text: "Profit",
//             },
//           },
//           {
//             opposite: true,
//             title: {
//               text: "Growth",
//             },
//           },
//         ],
//       },
//     });
//   }
//   fetchMonth =()=>{
//     // console.log(this.props.data)
//     const eqarray:number[] = []
//     const baarray:number[] = []
//     const prarray:number[] = []
//     const daarray:string[] = []
//     const equityarray:number[] = []
//     const balancearray:number[] = []
//     const profitarray:number[] = []

//     const eqdata = this.props.data.map(
//       (daily)=>{
//         // return{
//         //   data: daily.equity
//         // }
//         const equityGrowth = Number(Number(daily.equity)/30000-1).toFixed(2)
//         const balanceGrowth = Number(Number(daily.balance)-30000).toFixed(2)
//         const dailyProfit = Number(daily.profit).toFixed(2)
//         daarray.push(daily.date)
//         console.log(daarray)
//         eqarray.push(Number(equityGrowth))
//         baarray.push(Number(balanceGrowth))
//         prarray.push(Number(dailyProfit))
//       }
//     )
//     console.log(baarray)
//     eqarray.shift()
//     baarray.shift()
//     prarray.shift()
//     console.log(baarray)
//     let eqsum = 0
//     let basum = 0
//     let prosum = 0
//     for(let i = 0; i<20;i++){
//       eqsum += eqarray[i]
//       basum += baarray[i]
//       prosum += prarray[i]
//     }
//     equityarray.push(eqsum)
//     balancearray.push(basum)
//     profitarray.push(prosum)
//     for(let i = 20; i<24 ;i++){
//       eqsum += eqarray[i]
//       basum += baarray[i]
//       prosum += prarray[i]
//     }
//     equityarray.push(eqsum)
//     balancearray.push(basum)
//     profitarray.push(prosum)
//     console.log(equityarray)

//     this.setState({
//       series: [
//         {
//           name: "Profit",
//           type: "column",
//           data: profitarray,
//         },
//         {
//           name: "Growth",
//           type: "line",
//           data: balancearray,
//         },
//         {
//           name: "Equity Growth",
//           type: "line",
//           data: equityarray,
//         },
//       ],
//       options: {
//         chart: {
//           height: 350,
//           type: "line",
//         },
//         stroke: {
//           width: [0, 4],
//         },
//         title: {
//           text: "Millifx ApexChart Demo",
//         },
//         dataLabels: {
//           enabled: true,
//           enabledOnSeries: [1],
//         },
//         labels: {},
//         xaxis: {
//           type: "datetime",
//         },
//         yaxis: [
//           {
//             title: {
//               text: "Profit",
//             },
//           },
//           {
//             opposite: true,
//             title: {
//               text: "Growth",
//             },
//           },
//         ],
//       },
//     });
//   }

//   componentDidMount(){
//     this.fetchDay()
//   }
//   render(){
//     const { options , series } = this.state;
//     return (
//       <div id="chart">
//         <div className="buttonContainer">
//           <button onClick={this.fetchDay}>Day</button>
//           <button onClick={this.fetchWeek}>Week</button>
//           <button onClick={this.fetchMonth}>Month</button>
//         </div>
//         <AChart
//           options={options}
//           series={series}
//           type="line"
//           height={350}
//         />
//       </div>
//     );
//   }
// }

// export default Chart;
