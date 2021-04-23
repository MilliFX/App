import * as React from "react";
import { Daily } from "../../utils/constants";
import "./index.css";
import AChart from "react-apexcharts";

interface ChartProps {
  data: Daily[];
}

const Chart = ({ data }: ChartProps) => {
  //1. Manage Data Part
  //1.1 Check mockDataLength
  const dataLength = data.length;
  //1.2 Sort data by Day
  // creat a new arry only contains the {date: date, balance: balance}
  const dayPair = data.map(
    (daily)=>{
      const currentDayBalanceGrowth = {x: daily.date, y:Number((daily.balance - 30000).toFixed(2))}
      const currentDayEqualityGrowth = {x: daily.date, y: Number((daily.equity/30000).toFixed(2))}
      const currentDayProfit = {x: daily.date, y: Number((daily.profit).toFixed(2))}
      // console.log(currentDayBalance)
      return {
        currentDayBalanceGrowth,
        currentDayEqualityGrowth,
        currentDayProfit
      }
    }
  )

  //destruct 3 parameters from daypair
  //prepare for week data set
  //series can process the data set, such as [10/10/2021, 0.03]
  const dailyBalanceGrowth = dayPair.map(
    (item)=>{
      return item.currentDayBalanceGrowth
    }
  )
  const dailyEqualityGrowth = dayPair.map(
    (item)=>{
      return item.currentDayEqualityGrowth
    }
  )
  const dailyProfit = dayPair.map(
    (item)=>{
      return item.currentDayProfit
    }
  )
  console.log(dailyBalanceGrowth,dailyEqualityGrowth,dailyProfit)
  //1.3 Sort data by Week(from Sunday)
  for(var i=0; i<dayPair.length; i++){
    
  }
  //1.4 Sort data by Month





  //2. Config chart design part
  //2.1 Apexchart basic configuration
  const options = {
    chart: {
      background:'#f5f5f5'
    },
    yaxis: [
      {
        title: {
          text: "BalanceGrowth",
        },
      },
      {
        opposite: true,
        title: {
          text: "EqualityGrowth",
        },
      },
    ],
    //zoom-in & zoom-out
    plotOptions:{
      area:{
        fillTo:'origin',
      }
    },
  };

  //2.2 Apexchart data filled
  //series order determine the tooltip order, and it is also determine the yaxis number.
  const series = [
    {
      name: 'BalanceGrowth',
      type: 'column',
      data: dailyBalanceGrowth
    }, 
    {
      name: 'EqualityGrowth',
      type: 'area',
      data: dailyEqualityGrowth
    },
    {
      name: 'Profit',
      type: 'line',
      data: dailyProfit
    }, 
];


  return (
    <div className="apexchartContainer">
      <div>This is the Title</div>
      <div>
        <AChart options={options} series={series} height={650} />
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
        // plotOptions:{
        //   area:{
        //     fillTo:'origin',
        //   }
        // },
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
        // yaxis: [
        //   {
        //     title: {
        //       text: "Profit",
        //     },
        //   },
        //   {
        //     opposite: true,
        //     title: {
        //       text: "Growth",
        //     },
        //   },
        // ],
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
