import * as React from "react";
import { Daily } from "../../utils/constants";
import "./index.css";
import AChart from "react-apexcharts";
import {useState, useEffect} from 'react';

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
      const currentDayEqualityGrowth = {x: daily.date, y: Number((daily.equity/30000-1).toFixed(2))}
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
  // console.log(dailyBalanceGrowth,dailyEqualityGrowth,dailyProfit)


  //1.3 Sort data by Week(from Sunday)
  //due to this new mockDate dived in 5 sets with 5 days per set, so the week data would be 5 sets, and the label will be the first day of each week from Sunday as the first day of week
  const weeklyBalanceGrowth = [dailyBalanceGrowth[0]]
  const weeklyEqualityGrowth = [dailyEqualityGrowth[0]]
  const weeklyProfit = [dailyProfit[0]]
  const restWeeklyBalanceGrowthArray = dailyBalanceGrowth.slice(1)
  const restWeeklyEqualityGrowthArray = dailyEqualityGrowth.slice(1)
  const restWeeklyProfitArray = dailyProfit.slice(1)
  // console.log(restWeeklyBalanceGrowthArray)
  if(restWeeklyBalanceGrowthArray.length = restWeeklyEqualityGrowthArray.length = restWeeklyProfitArray.length){
    const numberOfWeek = Math.floor(restWeeklyBalanceGrowthArray.length/5)
    const restNumberOfWeek = restWeeklyBalanceGrowthArray.length%5
    //push the integer week data to each array
    for(let i =0 ; i<numberOfWeek; i++){
        const weeklyBalanceX = dailyBalanceGrowth[i*5+1].x
        const weeklyEqualityX = dailyEqualityGrowth[i*5+1].x
        const weeklyProfitX = dailyProfit[i*5+1].x

        const weeklyBalanceYArray = restWeeklyBalanceGrowthArray.slice(i*5,(i+1)*5)
        const weeklyEqualityYArray = restWeeklyEqualityGrowthArray.slice(i*5,(i+1)*5)
        const weeklyProfitYArray = restWeeklyProfitArray.slice(i*5,(i+1)*5)

        const weeklyBalanceYDataArray = weeklyBalanceYArray.map(
          (item)=>{
            return item.y
          }
        )
        const weeklyEqualityYDataArray = weeklyEqualityYArray.map(
          (item)=>{
            return item.y
          }
        )
        const weeklyProfitYDataArray = weeklyProfitYArray.map(
          (item)=>{
            return item.y
          }
        )

        const sumBalanceY = weeklyBalanceYDataArray.reduce(
          (total,num)=>{
            return (total+num)
          },0
        )
        const sumEqualityY = weeklyEqualityYDataArray.reduce(
          (total,num)=>{
            return (total+num)
          },0
        )
        const sumProfitY = weeklyProfitYDataArray.reduce(
          (total,num)=>{
            return (total+num)
          },0
        )

        const pushBalanceContent = {x: weeklyBalanceX, y:Number(sumBalanceY.toFixed(2))}
        const pushEqualityContent = {x: weeklyEqualityX, y:Number(sumEqualityY.toFixed(2))}
        const pushProfitContent = {x: weeklyProfitX, y: Number(sumProfitY.toFixed(2))}

        weeklyBalanceGrowth.push(pushBalanceContent)
        weeklyEqualityGrowth.push(pushEqualityContent)
        weeklyProfit.push(pushProfitContent)
    }
    // console.log(dailyBalanceGrowth)
    // console.log(weeklyBalanceGrowth)
    // console.log(weeklyEqualityGrowth)
    // console.log(weeklyProfit)

    //push the rest day data to each array
    const restPosition = dailyBalanceGrowth.length - restNumberOfWeek
    const lastPosition = dailyBalanceGrowth.length - 1

    const restBalanceArrayX = dailyBalanceGrowth[restPosition].x
    const restEqualityArrayX = dailyEqualityGrowth[restPosition].x
    const restProfitArrayX = dailyProfit[restPosition].x

    const restBalanceGrowthArray = dailyBalanceGrowth.slice(restPosition,lastPosition+1)
    const restEqualityGrowthArray = dailyEqualityGrowth.slice(restPosition,lastPosition+1)
    const restProfitArray = dailyProfit.slice(restPosition,lastPosition+1)

    const restBalanceGrowthYDataArray = restBalanceGrowthArray.map(
      (item)=>{
        return item.y
      }
    )
    const restEqualityGrowthYDataArray = restEqualityGrowthArray.map(
      (item)=>{
        return item.y
      }
    )
    const restProfitYDataArray = restProfitArray.map(
      (item)=>{
        return item.y
      }
    )

    // console.log(restBalanceGrowthYDataArray)
    const restSumBalanceY = restBalanceGrowthYDataArray.reduce(
      (total,num)=>{
        return (total+num)
      },0
    )
    const restSumEqualityY = restEqualityGrowthYDataArray.reduce(
      (total,num)=>{
        return (total+num)
      },0
    )
    const restSumProfitY = restProfitYDataArray.reduce(
      (total,num)=>{
        return (total+num)
      },0
    )

    const pushRestBalanceContent = {x: restBalanceArrayX, y:Number(restSumBalanceY.toFixed(2))}
    weeklyBalanceGrowth.push(pushRestBalanceContent)
    const pushRestEqualityContent = {x: restEqualityArrayX, y: Number(restSumEqualityY.toFixed(2))}
    weeklyEqualityGrowth.push(pushRestEqualityContent)
    const pushRestProfitContent = {x: restProfitArrayX, y: Number(restSumProfitY.toFixed(2))}
    weeklyProfit.push(pushRestProfitContent)
    // console.log(weeklyBalanceGrowth)
    // console.log(weeklyEqualityGrowth)
    // console.log(weeklyProfit)
  }
  else{
    console.log("Some data may be droped! check the constants!")
  }

  //1.4 Sort data by Month
  const monthlyBalanceGrowth = [dailyBalanceGrowth[0]]
  const monthlyEqualityGrowth = [dailyEqualityGrowth[0]]
  const monthlyProfit = [dailyProfit[0]]

  //second month data generator
  const secondMonthBalanceArray = dailyBalanceGrowth.slice(1,21)
  const secondMonthEqualityArray = dailyEqualityGrowth.slice(1,21)
  const secondMonthProfitArray = dailyProfit.slice(1,21)

  const secondMonthBalanceX = secondMonthBalanceArray[0].x
  const secondMonthEqualityX = secondMonthEqualityArray[0].x
  const secondMonthProfitX = secondMonthProfitArray[0].x

  const secondMonthBalanceDataArray = secondMonthBalanceArray.map(
    (item)=>{
      return item.y
    }
  )
  const secondMonthEqualityDataArray = secondMonthEqualityArray.map(
    (item)=>{
      return item.y
    }
  )
  const secondMonthProfitDataArray = secondMonthProfitArray.map(
    (item)=>{
      return item.y
    }
  )

  const secondMonthBalanceY = secondMonthBalanceDataArray.reduce(
    (total,num)=>{
      return total+num
    },0
  )
  const secondMonthEqualityY = secondMonthEqualityDataArray.reduce(
    (total,num)=>{
      return total+num
    },0
  )
  const secondMonthProfitY = secondMonthProfitDataArray.reduce(
    (total,num)=>{
      return total+num
    },0
  )

  const secondMonthBalanceContent = {x: secondMonthBalanceX, y:Number(secondMonthBalanceY.toFixed(2))}
  monthlyBalanceGrowth.push(secondMonthBalanceContent)

  const secondMonthEqualityContent = {x: secondMonthEqualityX, y:Number(secondMonthEqualityY.toFixed(2))}
  monthlyEqualityGrowth.push(secondMonthEqualityContent)

  const secondMonthProfitContent = {x: secondMonthProfitX, y:Number(secondMonthProfitY.toFixed(2))}
  monthlyProfit.push(secondMonthProfitContent)

//third month data generator

const thirdMonthBalanceArray = dailyBalanceGrowth.slice(21,25)
const thirdMonthEqualityArray = dailyEqualityGrowth.slice(21,25)
const thirdMonthProfitArray = dailyProfit.slice(21,25)

const thirdMonthBalanceX = thirdMonthBalanceArray[0].x
const thirdMonthEqualityX = thirdMonthEqualityArray[0].x
const thirdMonthProfitX = thirdMonthProfitArray[0].x

const thirdMonthBalanceDataArray = thirdMonthBalanceArray.map(
  (item)=>{
    return item.y
  }
)
const thirdMonthEqualityDataArray = thirdMonthEqualityArray.map(
  (item)=>{
    return item.y
  }
)
const thirdMonthProfitDataArray = thirdMonthProfitArray.map(
  (item)=>{
    return item.y
  }
)

const thirdMonthBalanceY = thirdMonthBalanceDataArray.reduce(
  (total,num)=>{
    return total+num
  },0
)
const thirdMonthEqualityY = thirdMonthEqualityDataArray.reduce(
  (total,num)=>{
    return total+num
  },0
)
const thirdMonthProfitY = thirdMonthProfitDataArray.reduce(
  (total,num)=>{
    return total+num
  },0
)

const thirdMonthBalanceContent = {x: thirdMonthBalanceX, y:Number(thirdMonthBalanceY.toFixed(2))}
monthlyBalanceGrowth.push(thirdMonthBalanceContent)

const thirdMonthEqualityContent = {x: thirdMonthEqualityX, y:Number(thirdMonthEqualityY.toFixed(2))}
monthlyEqualityGrowth.push(thirdMonthEqualityContent)

const thirdMonthProfitContent = {x: thirdMonthProfitX, y:Number(thirdMonthProfitY.toFixed(2))}
monthlyProfit.push(thirdMonthProfitContent)





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
      type: 'line',
      data: dailyEqualityGrowth
    },
    {
      name: 'Profit',
      type: 'area',
      data: dailyProfit
    }, 
];
const [optionsContent, setOptionsContent] = useState(options)
const [seriesContent, setSeriesContent] = useState(series)


  return (
    <div className="apexchartContainer">
      <div>This is the Title</div>
      <div>
        <AChart options={optionsContent} series={seriesContent} height={650} />
      </div>
      <div className="buttonContainer">
        
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
