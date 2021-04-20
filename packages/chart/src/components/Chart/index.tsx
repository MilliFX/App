import { Daily } from "../../utils/constants";
import { Statistic, Row, Col, Button, Typography } from "antd";
import { useState, useEffect } from "react";
import {
  XAxis,
  XYPlot,
  ChartLabel,
  makeWidthFlexible,
  HorizontalGridLines,
  LineSeries,
  DiscreteColorLegend,
} from "react-vis";
import "../../../node_modules/react-vis/dist/style.css";
import "antd/dist/antd.css";
import ChartTop from './chartTop';

interface ChartProps {
  data: Daily[];
}
const { Text } = Typography;
const FlexibleXYPlot = makeWidthFlexible(XYPlot);
const palette = {
  balance: "#EB5757",
  equity: "#2F80ED",
  profitPositive: "#F2994A",
  profitNegative: "#6FCF97",
};

const Chart = ({ data }: ChartProps) => {
  const rawData = data.map((daily) => ({
    ...daily,
    date: new Date(daily.date).toDateString().substr(4, 13),
    balance: daily.balance,
    equity: daily.equity,
    profit: daily.profit / (data[0].balance / 100),
  }));

  const balanceMax = rawData.reduce((prev, current) =>
    prev.balance > current.balance ? prev : current
  ).balance;

  const equityMin = rawData.reduce((prev, current) =>
    prev.equity < current.equity ? prev : current
  ).equity;

  const domain = { start: equityMin * 0.95, end: balanceMax * 1.05 };

  const [state, setState] = useState(
    rawData.slice(rawData.length - 8, rawData.length - 1)
  );
  const [current, setCurrent] = useState({
    date: "Today",
    balance: state[state.length - 1].balance,
    equity: state[state.length - 1].equity,
    profit: state[state.length - 1].profit,
  });

  const [showBalance, setShowBalance] = useState(true);
  const [showEquity, setShowEquity] = useState(true);
  const [startDate, setStartDate] = useState(state[0].date.substr(0, 7));
  const onNearestX = (value: any, { index }) => {
    setCurrent({
      date: state[index].date,
      balance: state[index].balance,
      equity: state[index].equity,
      profit: state[index].profit,
    });
  };

  useEffect(() => {
    state.length > 7
      ? setStartDate("")
      : setStartDate(state[0].date.substr(0, 7));
  }, [state]);

  return (
    <>
       {/* <ChartTop data={current} />   */}
       <Row justify="center">
        <Col span={24}>
          <Text>{current.date}</Text>
        </Col>
      </Row>
      <Row justify="center">
        <Col span={12}>
          <Statistic
            title="Balance"
            value={current.balance}
            precision={2}
            prefix="$"
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Equity"
            value={current.equity}
            precision={2}
            prefix="$"
          />
        </Col>
      </Row>
      <Row justify="center">
        <Col span={24}>
          <Statistic
            title="Profit"
            value={current.profit}
            precision={2}
            valueStyle={{
              color:
                current.profit > 0
                  ? palette.profitPositive
                  : palette.profitNegative,
            }}
            suffix="%"
          />
        </Col>
      </Row> 

     

      <FlexibleXYPlot
        xType="ordinal"
        yDomain={[domain.start, domain.end]}
        height={window.innerHeight * 0.3}
        onMouseLeave={() =>
          setCurrent({
            date: "Today",
            balance: state[state.length - 1].balance,
            equity: state[state.length - 1].equity,
            profit: state[state.length - 1].profit,
          })
        }
      >
        {showEquity && (
          <LineSeries
            data={state.map((daily) => ({
              x: daily.date,
              y: daily.equity,
            }))}
            color={palette.equity}
            onNearestX={onNearestX}
          />
        )}
        {showBalance && (
          <LineSeries
            data={state.map((daily) => ({
              x: daily.date,
              y: daily.balance,
            }))}
            color={palette.balance}
            onNearestX={onNearestX}
          />
        )}
        <XAxis hideTicks />
        <HorizontalGridLines tickTotal={2} />
        <ChartLabel
          text={startDate}
          includeMargin={false}
          xPercent={0.025}
          yPercent={1.2}
        />
        <ChartLabel
          text="Today"
          includeMargin={false}
          xPercent={0.9}
          yPercent={1.2}
        />
      </FlexibleXYPlot>

      <Row justify="center">
        <Col span={10}>
          <DiscreteColorLegend
            onItemClick={() => setShowBalance(!showBalance)}
            items={[{ title: "Balance", color: palette.balance }]}
          />
        </Col>
        <Col span={10}>
          <DiscreteColorLegend
            onItemClick={() => setShowEquity(!showEquity)}
            items={[{ title: "Equity", color: palette.equity }]}
          />
        </Col>
      </Row>
      <Row justify="center">
        <Col span={4}>
          <Button
            type="text"
            onClick={() => {
              setState(rawData.slice(rawData.length - 8, rawData.length - 1));
            }}
          >
            1W
          </Button>
        </Col>
        <Col span={4}>
          <Button
            type="text"
            onClick={() => {
              setState(rawData.slice(rawData.length - 16, rawData.length - 1));
            }}
          >
            1M
          </Button>
        </Col>
        <Col span={4}>
          <Button
            type="text"
            onClick={() => {
              setState(rawData.slice(rawData.length - 23, rawData.length - 1));
            }}
          >
            3M
          </Button>
        </Col>
      </Row>
    </>
  );
};
export default Chart;
