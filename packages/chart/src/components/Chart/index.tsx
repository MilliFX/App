import * as React from "react";
import { Daily } from "../../utils/constants";
import "./index.css";
import AChart from "react-apexcharts";
import { useState, useEffect } from "react";
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";
// import { balance, equity, profit, series, testdata } from "../../utils/series";
// import useGlobal from "use-global-hook";

// Interface:
interface ChartProps {
  data: Daily[];
}
interface DataArray {
  x: string;
  y: number;
}
interface Series {
  name: string;
  type: "area" | "line";
  data: DataArray[];
}

//
// console.log(oneWeekSeries.length)
// console.log(oneWeekBalance[6].x);
// console.log(oneWeekEquity[6].x);
// const needDayLong = 7;
// console.log(testdata);

const Chart = ({ data }: ChartProps) => {
  const initNeedDayLong = 7;
  const initBalance = 5;
  const initEquity = 5;
  const initProfit = 5;
  const [todayLable, setTodayLable] = useState("Today");
  const [balanceLable, setBalanceLable] = useState(initBalance);
  const [equityLable, setEquityLable] = useState(initEquity);
  const [profitLable, setProfitLable] = useState(initProfit);
  const [alignment, setAlignment] = React.useState("oneWeek");
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
  const resultData = altArray.map((item) => {
    const currentBalance: DataArray = {
      x: item.date,
      y: Number(item.balance.toFixed(2)),
    };
    const currentEquity: DataArray = {
      x: item.date,
      y: Number(item.equity.toFixed(2)),
    };
    const currentProfit: DataArray = {
      x: item.date,
      y: Number(item.profit.toFixed(2)),
    };
    return {
      currentBalance,
      currentEquity,
      currentProfit,
    };
  });
  const balance: DataArray[] = resultData.map((item) => {
    return item.currentBalance;
  });
  const equity: DataArray[] = resultData.map((item) => {
    return item.currentEquity;
  });
  const profit: DataArray[] = resultData.map((item) => {
    return item.currentProfit;
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
  const options = {
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
          if (labBalance < 0) {
            document.getElementById("balanceLable")!.style.color = "#c9d732";
          } else {
            document.getElementById("balanceLable")!.style.color = "black";
          }
          if (labEquity < 0) {
            document.getElementById("equityLable")!.style.color = "#c9d732";
          } else {
            document.getElementById("equityLable")!.style.color = "black";
          }
          if (labProfit < 0) {
            document.getElementById("profitLable")!.style.color = "#c9d732";
          } else {
            document.getElementById("profitLable")!.style.color = "#00d800";
          }
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
    // redrawOnParentResize: true,
    // redrawOnWindowResize: true,
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
  const handleAlignment = (
    event: any,
    newAlignment: React.SetStateAction<string>
  ) => {
    setAlignment(newAlignment);

    switch (newAlignment) {
      case "oneWeek":
        setNeedDayLong(7);
        break;
      case "oneMonth":
        setNeedDayLong(20);
        break;
      case "threeMonth":
        setSeriesContent(series);
        break;
    }
  };
  useEffect(() => {
    // console.log(needDayLong)
    setSeriesContent(series);
    setOptionsContent(options);
  }, [needDayLong])

  return (
    <div className="apexchartContainer">
      <div className="titleContainer">ApexChart Demo</div>
      <div className="dateContainer">
        <div>{todayLable}</div>
      </div>
      <div className="dataContainer">
        <div className="dataDetailContainer">
          <div className="detailTitle">Balance</div>
          <div className="detailContent" id="balanceLable">
            $ {balanceLable}
          </div>
        </div>
        <div className="dataDetailContainer">
          <div className="detailTitle">Equity</div>
          <div className="detailContent" id="equityLable">
            $ {equityLable}
          </div>
        </div>
        <div className="dataDetailContainer">
          <div className="detailTitle">Profit</div>
          <div className="detailContent" id="profitLable">
            {profitLable} %
          </div>
        </div>
      </div>
      <div className="tableContainer">
        <div className="tablechartContainer">
          <AChart options={optionsContent} series={seriesContent} />
        </div>
      </div>
      <div className="buttonContainer">
        <ToggleButtonGroup
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
        </ToggleButtonGroup>
      </div>
    </div>
  );
};

export default Chart;
