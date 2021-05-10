import * as React from "react";
import { Daily } from "../../utils/constants";
import AChart from "react-apexcharts";
import { useState, useEffect } from "react";
import { ApexOptions } from "apexcharts";
import {Wrapper, TitleWrapper, DateWrapper,DataWrapper,DataDetailWrapper,DataTitle,DataContent, TableWrapper,TableChart} from './style';
import './index.css';

//type:
type SeriesType = "area" | "line";

// Interface:
interface ChartProps {
  data: Daily[];
}
interface DataPoint {
  x: string;
  y: number;
}
interface Series {
  name: string;
  type: SeriesType;
  data: DataPoint[];
}

const Chart = ({ data }: ChartProps) => {
  const initNeedDayLong = 7;
  const initBalance = 5;
  const initEquity = 5;
  const initProfit = 5;
  const [todayLable, setTodayLable] = useState("Today");
  const [balanceLable, setBalanceLable] = useState(initBalance);
  const [equityLable, setEquityLable] = useState(initEquity);
  const [profitLable, setProfitLable] = useState(initProfit);
  // const [alignment, setAlignment] = React.useState("oneWeek");
  const [needDayLong, setNeedDayLong] = useState(initNeedDayLong);
  //Data Processing:
  const altArray: Daily[] = [];
  const dataPiece = data.slice(data.length - needDayLong);
  for (let i = 0; i < dataPiece.length; i++) {
    const dateFormate = dataPiece[i].date;
    switch (dateFormate.slice(0, 2)) {
      case "01":
        altArray.push({
          date: `${dateFormate.slice(3, 5)} Jan ${dateFormate.slice(6)}`,
          balance: dataPiece[i].balance,
          profit: dataPiece[i].profit,
          equity: dataPiece[i].equity,
        });
        break;
      case "02":
        altArray.push({
          date: `${dateFormate.slice(3, 5)} Feb ${dateFormate.slice(6)}`,
          balance: dataPiece[i].balance,
          profit: dataPiece[i].profit,
          equity: dataPiece[i].equity,
        });
        break;
      case "03":
        altArray.push({
          date: `${dateFormate.slice(3, 5)} Mar ${dateFormate.slice(6)}`,
          balance: dataPiece[i].balance,
          profit: dataPiece[i].profit,
          equity: dataPiece[i].equity,
        });
        break;
      case "04":
        altArray.push({
          date: `${dateFormate.slice(3, 5)} Apr ${dateFormate.slice(6)}`,
          balance: dataPiece[i].balance,
          profit: dataPiece[i].profit,
          equity: dataPiece[i].equity,
        });
        break;
      case "05":
        altArray.push({
          date: `${dateFormate.slice(3, 5)} May ${dateFormate.slice(6)}`,
          balance: dataPiece[i].balance,
          profit: dataPiece[i].profit,
          equity: dataPiece[i].equity,
        });
        break;
      case "06":
        altArray.push({
          date: `${dateFormate.slice(3, 5)} Jun ${dateFormate.slice(6)}`,
          balance: dataPiece[i].balance,
          profit: dataPiece[i].profit,
          equity: dataPiece[i].equity,
        });
        break;
      case "07":
        altArray.push({
          date: `${dateFormate.slice(3, 5)} July ${dateFormate.slice(6)}`,
          balance: dataPiece[i].balance,
          profit: dataPiece[i].profit,
          equity: dataPiece[i].equity,
        });
        break;
      case "08":
        altArray.push({
          date: `${dateFormate.slice(3, 5)} Aug ${dateFormate.slice(6)}`,
          balance: dataPiece[i].balance,
          profit: dataPiece[i].profit,
          equity: dataPiece[i].equity,
        });
        break;
      case "09":
        altArray.push({
          date: `${dateFormate.slice(3, 5)} Sep ${dateFormate.slice(6)}`,
          balance: dataPiece[i].balance,
          profit: dataPiece[i].profit,
          equity: dataPiece[i].equity,
        });
        break;
      case "10":
        altArray.push({
          date: `${dateFormate.slice(3, 5)} Oct ${dateFormate.slice(6)}`,
          balance: dataPiece[i].balance,
          profit: dataPiece[i].profit,
          equity: dataPiece[i].equity,
        });
        break;
      case "11":
        altArray.push({
          date: `${dateFormate.slice(3, 5)} Nov ${dateFormate.slice(6)}`,
          balance: dataPiece[i].balance,
          profit: dataPiece[i].profit,
          equity: dataPiece[i].equity,
        });
        break;
      case "12":
        altArray.push({
          date: `${dateFormate.slice(3, 5)} Dec ${dateFormate.slice(6)}`,
          balance: dataPiece[i].balance,
          profit: dataPiece[i].profit,
          equity: dataPiece[i].equity,
        });
        break;
    }
  }
const balance: DataPoint[] = [];
const equity: DataPoint[] = [];
const profit: DataPoint[] = [];
  const resultData = altArray.map((item) => {
    const currentBalance: DataPoint = {
      x: item.date,
      y: Number(item.balance.toFixed(2)),
    };
    const currentEquity: DataPoint = {
      x: item.date,
      y: Number(item.equity.toFixed(2)),
    };
    const currentProfit: DataPoint = {
      x: item.date,
      y: Number(item.profit.toFixed(2)),
    };
    balance.push(currentBalance)
    equity.push(currentEquity)
    profit.push(currentProfit)
  });

  const series: Series[] = [
    {
        name: "Balance",
        type: "area",
        data: balance,
    },
    {
        name: "Equity",
        type: "area",
        data: equity,
    },
]
const [seriesContent, setSeriesContent] = useState(series);
  //Chart Configuration:
  const options: ApexOptions = {
    xaxis: {
      axisBorder: {
        show: true,
        color: "#78909C",
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
      crosshairs: {
        show: true,
      },
    },
    chart: {
      type: "area",
      events: {
        mouseMove: (event: any, chartContext: any, config: any) => {
          // The last parameter config contains additional information like `seriesIndex` and `dataPointIndex` for cartesian charts.
          const labPosition = config.dataPointIndex;
          const labBalance = config.globals.series[0][labPosition];
          const labEquity = config.globals.series[1][labPosition];
          const labProfit = Number(
            ((profit[labPosition].y - 100) / 100).toFixed(2)
          );
          const labToday = config.globals.categoryLabels[labPosition];
          // console.log(`labPosition${labPosition}`);
          setBalanceLable(labBalance);
          setEquityLable(labEquity);
          setProfitLable(labProfit);
          setTodayLable(labToday);
          // console.log(config)
          //if number is bigger than 0, the common color, else green
          // if (labBalance < 0) {
          //   document.getElementById("balanceLable")!.style.color = "#c9d732";
          // } else {
          //   document.getElementById("balanceLable")!.style.color = "black";
          // }
          // if (labEquity < 0) {
          //   document.getElementById("equityLable")!.style.color = "#c9d732";
          // } else {
          //   document.getElementById("equityLable")!.style.color = "black";
          // }
          // if (labProfit < 0) {
          //   document.getElementById("profitLable")!.style.color = "#c9d732";
          // } else {
          //   document.getElementById("profitLable")!.style.color = "#00d800";
          // }
        },
      },
      toolbar: {
        show: false,
      },
    },
    yaxis: {
      show: false,
    },
    stroke: {
      width: [2, 2],
    },
    tooltip: {
      enabled: true,
      enabledOnSeries: [0, 1],
      shared: true,
      followCursor: true,
      custom: () => {
        return null;
      },
      marker: {
        show: false,
      },
    },
    legend: {
      show: true,
    },
    fill: {
      type: "gradient",
      gradient: {
        type: "vertical",
        shadeIntensity: 0.05,
        opacityFrom: 0.4,
        opacityTo: 0,
        stops: [0, 95, 100],
      },
    },
  };
  const [optionsContent, setOptionsContent] = useState(options);

  //functions on toggleButtonGroup
  // const handleAlignment = (
  //   event: any,
  //   newAlignment: React.SetStateAction<string>
  // ) => {
  //   setAlignment(newAlignment);
  //   setTodayLable("Today")
  //   setBalanceLable(initBalance)
  //   setEquityLable(initEquity)
  //   setProfitLable(initProfit)

  //   switch (newAlignment) {
  //     case "oneWeek":
  //       setNeedDayLong(7);
  //       break;
  //     case "oneMonth":
  //       setNeedDayLong(20);
  //       break;
  //     case "threeMonth":
  //       setSeriesContent(series);
  //       break;
  //   }
  // };
  // useEffect(() => {
  //   // console.log(needDayLong)
  //   setSeriesContent(series);
  //   setOptionsContent(options);
  // }, [needDayLong])

  return (
    <Wrapper>
      <TitleWrapper>ApexChart Demo</TitleWrapper>
      <DateWrapper>
        <span>{todayLable}</span>
      </DateWrapper>
      <DataWrapper>
        <DataDetailWrapper>
          <DataTitle>Balance</DataTitle>
          <DataContent id="balanceLable" value={balanceLable}>
            $ {balanceLable}
          </DataContent>
        </DataDetailWrapper>
        <DataDetailWrapper>
          <DataTitle>Equity</DataTitle>
          <DataContent id="equityLable" value={equityLable}>
            $ {equityLable}
          </DataContent>
        </DataDetailWrapper>
        <DataDetailWrapper>
          <DataTitle>Profit</DataTitle>
          <DataContent id="profitLable" value={profitLable}>
            {profitLable} %
          </DataContent>
        </DataDetailWrapper>
      </DataWrapper>
      <TableWrapper>
        <TableChart>
          <AChart options={optionsContent} series={seriesContent} />
        </TableChart>
      </TableWrapper>
      <div className="buttonContainer">
        {/* <ToggleButtonGroup
          value={alignment}
          exclusive
          onChange={handleAlignment}
          aria-label="text alignment"
        >
          <ToggleButton
            value="oneWeek"
            aria-label="left aligned"
            className="toggleButton"
          >
            1W
          </ToggleButton>
          <ToggleButton value="oneMonth" aria-label="centered">
            1M
          </ToggleButton>
          <ToggleButton value="threeMonths" aria-label="right aligned">
            3M
          </ToggleButton>
        </ToggleButtonGroup> */}
      </div>
    </Wrapper>
  );
};

export default Chart;
