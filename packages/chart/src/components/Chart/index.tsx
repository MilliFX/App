import * as React from "react";
import { Daily } from "../../utils/constants";
import "./index.css";
import AChart from "react-apexcharts";
import { useState, useEffect } from "react";
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";

interface ChartProps {
  data: Daily[];
}

const Chart = ({ data }: ChartProps) => {
  const newDate = new Date().toDateString();
  const initBalance = 5;
  const initEquity = 5;
  const initProfit = 5;
  const [todayLable, setTodayLable] = useState("Today");
  const [balanceLable, setBalanceLable] = useState(initBalance);
  const [equityLable, setEquityLable] = useState(initEquity);
  const [profitLable, setProfitLable] = useState(initProfit);

  //1. Manage Data Part
  //1.1 Check mockDataLength
  const dataLength = data.length;
  //1.2 Sort data by Day
  // creat a new arry only contains the {date: date, balance: balance}
  const dayPair = data.map((daily) => {
    const currentDayBalanceGrowth = {
      x: daily.date,
      y: Number((daily.balance - 30000).toFixed(2)),
    };
    const currentDayEqualityGrowth = {
      x: daily.date,
      y: Number((daily.equity / 30000 - 1).toFixed(2)),
    };
    const currentDayProfit = {
      x: daily.date,
      y: Number(daily.profit.toFixed(2)),
    };
    // console.log(currentDayBalance)
    return {
      currentDayBalanceGrowth,
      currentDayEqualityGrowth,
      currentDayProfit,
    };
  });

  //destruct 3 parameters from daypair
  //prepare for week data set
  //series can process the data set, such as [10/10/2021, 0.03]
  const dailyBalanceGrowth = dayPair.map((item) => {
    return item.currentDayBalanceGrowth;
  });
  const dailyEqualityGrowth = dayPair.map((item) => {
    return item.currentDayEqualityGrowth;
  });
  const dailyProfit = dayPair.map((item) => {
    return item.currentDayProfit;
  });
  // console.log(dailyBalanceGrowth,dailyEqualityGrowth,dailyProfit)

  //1.3 Sort data by Week(from Sunday)
  //due to this new mockDate dived in 5 sets with 5 days per set, so the week data would be 5 sets, and the label will be the first day of each week from Sunday as the first day of week
  const weeklyBalanceGrowth = [dailyBalanceGrowth[0]];
  const weeklyEqualityGrowth = [dailyEqualityGrowth[0]];
  const weeklyProfit = [dailyProfit[0]];
  const restWeeklyBalanceGrowthArray = dailyBalanceGrowth.slice(1);
  const restWeeklyEqualityGrowthArray = dailyEqualityGrowth.slice(1);
  const restWeeklyProfitArray = dailyProfit.slice(1);
  // console.log(restWeeklyBalanceGrowthArray)
  if (
    (restWeeklyBalanceGrowthArray.length = restWeeklyEqualityGrowthArray.length =
      restWeeklyProfitArray.length)
  ) {
    const numberOfWeek = Math.floor(restWeeklyBalanceGrowthArray.length / 5);
    const restNumberOfWeek = restWeeklyBalanceGrowthArray.length % 5;
    //push the integer week data to each array
    for (let i = 0; i < numberOfWeek; i++) {
      const weeklyBalanceX = dailyBalanceGrowth[i * 5 + 1].x;
      const weeklyEqualityX = dailyEqualityGrowth[i * 5 + 1].x;
      const weeklyProfitX = dailyProfit[i * 5 + 1].x;

      const weeklyBalanceYArray = restWeeklyBalanceGrowthArray.slice(
        i * 5,
        (i + 1) * 5
      );
      const weeklyEqualityYArray = restWeeklyEqualityGrowthArray.slice(
        i * 5,
        (i + 1) * 5
      );
      const weeklyProfitYArray = restWeeklyProfitArray.slice(
        i * 5,
        (i + 1) * 5
      );

      const weeklyBalanceYDataArray = weeklyBalanceYArray.map((item) => {
        return item.y;
      });
      const weeklyEqualityYDataArray = weeklyEqualityYArray.map((item) => {
        return item.y;
      });
      const weeklyProfitYDataArray = weeklyProfitYArray.map((item) => {
        return item.y;
      });

      const sumBalanceY = weeklyBalanceYDataArray.reduce((total, num) => {
        return total + num;
      }, 0);
      const sumEqualityY = weeklyEqualityYDataArray.reduce((total, num) => {
        return total + num;
      }, 0);
      const sumProfitY = weeklyProfitYDataArray.reduce((total, num) => {
        return total + num;
      }, 0);

      const pushBalanceContent = {
        x: weeklyBalanceX,
        y: Number(sumBalanceY.toFixed(2)),
      };
      const pushEqualityContent = {
        x: weeklyEqualityX,
        y: Number(sumEqualityY.toFixed(2)),
      };
      const pushProfitContent = {
        x: weeklyProfitX,
        y: Number(sumProfitY.toFixed(2)),
      };

      weeklyBalanceGrowth.push(pushBalanceContent);
      weeklyEqualityGrowth.push(pushEqualityContent);
      weeklyProfit.push(pushProfitContent);
    }
    // console.log(dailyBalanceGrowth)
    // console.log(weeklyBalanceGrowth)
    // console.log(weeklyEqualityGrowth)
    // console.log(weeklyProfit)

    //push the rest day data to each array
    const restPosition = dailyBalanceGrowth.length - restNumberOfWeek;
    const lastPosition = dailyBalanceGrowth.length - 1;

    const restBalanceArrayX = dailyBalanceGrowth[restPosition].x;
    const restEqualityArrayX = dailyEqualityGrowth[restPosition].x;
    const restProfitArrayX = dailyProfit[restPosition].x;

    const restBalanceGrowthArray = dailyBalanceGrowth.slice(
      restPosition,
      lastPosition + 1
    );
    const restEqualityGrowthArray = dailyEqualityGrowth.slice(
      restPosition,
      lastPosition + 1
    );
    const restProfitArray = dailyProfit.slice(restPosition, lastPosition + 1);

    const restBalanceGrowthYDataArray = restBalanceGrowthArray.map((item) => {
      return item.y;
    });
    const restEqualityGrowthYDataArray = restEqualityGrowthArray.map((item) => {
      return item.y;
    });
    const restProfitYDataArray = restProfitArray.map((item) => {
      return item.y;
    });

    // console.log(restBalanceGrowthYDataArray)
    const restSumBalanceY = restBalanceGrowthYDataArray.reduce((total, num) => {
      return total + num;
    }, 0);
    const restSumEqualityY = restEqualityGrowthYDataArray.reduce(
      (total, num) => {
        return total + num;
      },
      0
    );
    const restSumProfitY = restProfitYDataArray.reduce((total, num) => {
      return total + num;
    }, 0);

    const pushRestBalanceContent = {
      x: restBalanceArrayX,
      y: Number(restSumBalanceY.toFixed(2)),
    };
    weeklyBalanceGrowth.push(pushRestBalanceContent);
    const pushRestEqualityContent = {
      x: restEqualityArrayX,
      y: Number(restSumEqualityY.toFixed(2)),
    };
    weeklyEqualityGrowth.push(pushRestEqualityContent);
    const pushRestProfitContent = {
      x: restProfitArrayX,
      y: Number(restSumProfitY.toFixed(2)),
    };
    weeklyProfit.push(pushRestProfitContent);
    // console.log(weeklyBalanceGrowth)
    // console.log(weeklyEqualityGrowth)
    // console.log(weeklyProfit)
  } else {
    console.log("Some data may be droped! check the constants!");
  }

  //1.4 Sort data by Month
  const monthlyBalanceGrowth = [dailyBalanceGrowth[0]];
  const monthlyEqualityGrowth = [dailyEqualityGrowth[0]];
  const monthlyProfit = [dailyProfit[0]];

  //second month data generator
  const secondMonthBalanceArray = dailyBalanceGrowth.slice(1, 21);
  const secondMonthEqualityArray = dailyEqualityGrowth.slice(1, 21);
  const secondMonthProfitArray = dailyProfit.slice(1, 21);

  const secondMonthBalanceX = secondMonthBalanceArray[0].x;
  const secondMonthEqualityX = secondMonthEqualityArray[0].x;
  const secondMonthProfitX = secondMonthProfitArray[0].x;

  const secondMonthBalanceDataArray = secondMonthBalanceArray.map((item) => {
    return item.y;
  });
  const secondMonthEqualityDataArray = secondMonthEqualityArray.map((item) => {
    return item.y;
  });
  const secondMonthProfitDataArray = secondMonthProfitArray.map((item) => {
    return item.y;
  });

  const secondMonthBalanceY = secondMonthBalanceDataArray.reduce(
    (total, num) => {
      return total + num;
    },
    0
  );
  const secondMonthEqualityY = secondMonthEqualityDataArray.reduce(
    (total, num) => {
      return total + num;
    },
    0
  );
  const secondMonthProfitY = secondMonthProfitDataArray.reduce((total, num) => {
    return total + num;
  }, 0);

  const secondMonthBalanceContent = {
    x: secondMonthBalanceX,
    y: Number(secondMonthBalanceY.toFixed(2)),
  };
  monthlyBalanceGrowth.push(secondMonthBalanceContent);

  const secondMonthEqualityContent = {
    x: secondMonthEqualityX,
    y: Number(secondMonthEqualityY.toFixed(2)),
  };
  monthlyEqualityGrowth.push(secondMonthEqualityContent);

  const secondMonthProfitContent = {
    x: secondMonthProfitX,
    y: Number(secondMonthProfitY.toFixed(2)),
  };
  monthlyProfit.push(secondMonthProfitContent);

  //third month data generator

  const thirdMonthBalanceArray = dailyBalanceGrowth.slice(21, 25);
  const thirdMonthEqualityArray = dailyEqualityGrowth.slice(21, 25);
  const thirdMonthProfitArray = dailyProfit.slice(21, 25);

  const thirdMonthBalanceX = thirdMonthBalanceArray[0].x;
  const thirdMonthEqualityX = thirdMonthEqualityArray[0].x;
  const thirdMonthProfitX = thirdMonthProfitArray[0].x;

  const thirdMonthBalanceDataArray = thirdMonthBalanceArray.map((item) => {
    return item.y;
  });
  const thirdMonthEqualityDataArray = thirdMonthEqualityArray.map((item) => {
    return item.y;
  });
  const thirdMonthProfitDataArray = thirdMonthProfitArray.map((item) => {
    return item.y;
  });

  const thirdMonthBalanceY = thirdMonthBalanceDataArray.reduce((total, num) => {
    return total + num;
  }, 0);
  const thirdMonthEqualityY = thirdMonthEqualityDataArray.reduce(
    (total, num) => {
      return total + num;
    },
    0
  );
  const thirdMonthProfitY = thirdMonthProfitDataArray.reduce((total, num) => {
    return total + num;
  }, 0);

  const thirdMonthBalanceContent = {
    x: thirdMonthBalanceX,
    y: Number(thirdMonthBalanceY.toFixed(2)),
  };
  monthlyBalanceGrowth.push(thirdMonthBalanceContent);

  const thirdMonthEqualityContent = {
    x: thirdMonthEqualityX,
    y: Number(thirdMonthEqualityY.toFixed(2)),
  };
  monthlyEqualityGrowth.push(thirdMonthEqualityContent);

  const thirdMonthProfitContent = {
    x: thirdMonthProfitX,
    y: Number(thirdMonthProfitY.toFixed(2)),
  };
  monthlyProfit.push(thirdMonthProfitContent);

  //2. Config chart design part
  //2.1 Apexchart basic configuration
  const options = {
    chart: {
      // background: "#f5f5f5",
      events: {
        mouseMove: function (
          event: any,
          chartContext: any,
          config: any
        ) {
          // The last parameter config contains additional information like `seriesIndex` and `dataPointIndex` for cartesian charts.
          const labPosition = config.dataPointIndex;
          const labBalance = config.globals.series[0][labPosition]
          const labEquity = config.globals.series[1][labPosition]
          const labProfit  = config.globals.series[2][labPosition]
          const labToday = config.globals.categoryLabels[labPosition]
          // console.log(`labPosition${labPosition}`)
          setBalanceLable(labBalance)
          setEquityLable(labEquity)
          setProfitLable(labProfit)
          setTodayLable(labToday)
          // console.log(config)
          if(labPosition == -1){
            setBalanceLable(initBalance)
            setEquityLable(initEquity)
            setProfitLable(initProfit)
            setTodayLable("Today")
          }
        },
      },
      toolbar: {
        show: true,
        offsetX: 0,
        offsetY: 0,
        tools: {
          download: false,
          selection: true,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: false,
        },
        export: {
          csv: {
            filename: undefined,
            columnDelimiter: ",",
            headerCategory: "category",
            headerValue: "value",
            dateFormatter(timestamp: string | number | Date) {
              return new Date(timestamp).toDateString();
            },
          },
          svg: {
            filename: undefined,
          },
          png: {
            filename: undefined,
          },
        },
        autoSelected: "zoom",
      },
      dropShadow: {
        enabled: false,
        enabledOnSeries: [0, 1, 2],
        top: 0,
        left: 0,
        blur: 3,
        color: "#000",
        opacity: 0.3,
      },
      zoom: {
        enabled: true,
        type: "x",
        autoScaleYaxis: false,
        zoomedArea: {
          fill: {
            color: "#90CAF9",
            opacity: 0.4,
          },
          stroke: {
            color: "#0D47A1",
            opacity: 0.4,
            width: 1,
          },
        },
      },
    },
    xaxis: {
      axisBorder: {
        show: true,
        color: "#78909C",
        height: 1,
        width: "100%",
        offsetX: 0,
        offsetY: 0,
      },
      axisTicks: {
        show: false,
        borderType: "solid",
        color: "#78909C",
        height: 6,
        offsetX: 0,
        offsetY: 0,
      },
      crosshairs:{
        show:true
      },
    },
    yaxis: [
      {
        //control Y tag data and title
        show:false,
        title: {
          text: "BalanceGrowth",
        },
        labels: {
          formatter: (val: Number) => {
            return `$${val}`;
          },
        },
      },
      {
        //control Y tag data and title
        show:false,
        opposite: true,
        title: {
          text: "EqualityGrowth",
        },
      },
    ],
    //zoom-in & zoom-out
    plotOptions: {
      area: {
        fillTo: "origin",
      },
    },
    //boreder-size
    stroke: {
      width: [3, 3, 3],
      curve:'smooth',
    },
    foreColor: "#373d3f",
    defaultLocale: "en",
    redrawOnParentResize: true,
    redrawOnWindowResize: true,
    dataLabels: {
      //The data tag on each line
      enabled: false,
      enabledOnSeries: [2],
      formatter: function (val: any, opts: any) {
        return `$${val}`;
      },
      textAnchor: "middle",
      distributed: false,
      offsetX: 0,
      offsetY: 0,
      style: {
        fontSize: "14px",
        fontFamily: "Helvetica, Arial, sans-serif",
        fontWeight: "bold",
        colors: undefined,
      },
      background: {
        enabled: true,
        foreColor: "#fff",
        padding: 4,
        borderRadius: 2,
        borderWidth: 1,
        borderColor: "#fff",
        opacity: 0.9,
        dropShadow: {
          enabled: true,
          top: 1,
          left: 1,
          blur: 1,
          color: "#000",
          opacity: 0.45,
        },
      },
      dropShadow: {
        enabled: true,
        top: 1,
        left: 1,
        blur: 1,
        color: "#000",
        opacity: 0.45,
      },
    },

    tooltip: {
      enabled: true,
      enabledOnSeries: [0, 1, 2],
      shared: true,
      followCursor: true,
      custom:()=>{
        return null
      },
      marker:{
        show:false,
      }
    },
    legend:{
      show:true
    }
  };

  //2.2 Apexchart data filled
  //series order determine the tooltip order, and it is also determine the yaxis number.
  const dailySeries = [
    {
      name: "BalanceGrowth",
      type: "line",
      data: dailyBalanceGrowth,
    },
    {
      name: "EqualityGrowth",
      type: "line",
      data: dailyEqualityGrowth,
    },
    {
      name: "Profit",
      type: "line",
      data: dailyProfit,
    },
  ];
  const weeklySeries = [
    {
      name: "BalanceGrowth",
      type: "line",
      data: weeklyBalanceGrowth,
    },
    {
      name: "EqualityGrowth",
      type: "line",
      data: weeklyEqualityGrowth,
    },
    {
      name: "Profit",
      type: "line",
      data: weeklyProfit,
    },
  ];
  const monthlySeries = [
    {
      name: "BalanceGrowth",
      type: "line",
      data: monthlyBalanceGrowth,
    },
    {
      name: "EqualityGrowth",
      type: "line",
      data: monthlyEqualityGrowth,
    },
    {
      name: "Profit",
      type: "line",
      data: monthlyProfit,
    },
  ];
  const [optionsContent, setOptionsContent] = useState(options);
  const [seriesContent, setSeriesContent] = useState(dailySeries);
  const [alignment, setAlignment] = React.useState("daily");
  const handleAlignment = (
    event: any,
    newAlignment: React.SetStateAction<string>
  ) => {
    setAlignment(newAlignment);
    // console.log(event)
    // console.log(newAlignment)
    if (newAlignment == "daily") {
      setSeriesContent(dailySeries);
    }
    if (newAlignment == "weekly") {
      setSeriesContent(weeklySeries);
    }
    if (newAlignment == "monthly") {
      setSeriesContent(monthlySeries);
    }
  };
  

  return (
    <div className="apexchartContainer">
      <div className="titleContainer">ApexChart Demo</div>
      <div className="dateContainer">
        <div>{todayLable}</div>
      </div>
      <div className="dataContainer">
        <div className="dataDetailContainer">
          <div className="detailTitle">Balance</div>
          <div className="detailContent">$ {balanceLable}</div>
        </div>
        <div className="dataDetailContainer">
          <div className="detailTitle">Equity</div>
          <div className="detailContent">{equityLable} %</div>
        </div>
        <div className="dataDetailContainer">
          <div className="detailTitle">Profit</div>
          <div className="detailContent">$ {profitLable}</div>
        </div>
      </div>
      <div>
        <AChart options={optionsContent} series={seriesContent} height={650} />
      </div>
      <div className="buttonContainer">
        <ToggleButtonGroup
          value={alignment}
          exclusive
          onChange={handleAlignment}
          aria-label="text alignment"
        >
          <ToggleButton value="daily" aria-label="left aligned">
            Daily
          </ToggleButton>
          <ToggleButton value="weekly" aria-label="centered">
            Weekly
          </ToggleButton>
          <ToggleButton value="monthly" aria-label="right aligned">
            Monthly
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
    </div>
  );
};

export default Chart;