import { Daily, palette, LegendLabel,Cross } from "../../utils/constants";
import { Row, Col } from "antd";

import {
  XAxis,
  XYPlot,
  ChartLabel,
  makeWidthFlexible,
  HorizontalGridLines,
  LineSeries,
  DiscreteColorLegend,
  AreaSeries,
  Crosshair,
} from "react-vis";
import "react-vis/dist/style.css";
import "antd/dist/antd.css";

interface MainChartProps {
  data: { 
    domain: { start: number; end: number; }; 
    state: { 
      date: string; 
      balance: number;
      equity: number; 
      profit: number; 
    }[]; 
    showEquity: boolean; 
    showBalance: boolean; 
    startDate: string; 
    crosshairValue: Cross[];
   };
  onNearestX: (value: any, { index }: { index: any; }) => void;
  onMouseLeave: () => void;
  balanceLegend: () => void;
  equityLegend: () => void;
}

const FlexibleXYPlot = makeWidthFlexible(XYPlot);
const MainChart = (props: MainChartProps) => {
  const {
    domain,
    state,
    showEquity,
    showBalance,
    startDate,
    crosshairValue,
  } = props.data;

  const equityData=state.map((daily: Daily) => ({
    x: daily.date,
    y: daily.equity,
  }))
  // const equityDataArea=state.map((daily: Daily) => ({
  //   x: Date.parse(daily.date),
  //   y: daily.equity,
  // }))
  const balanceData=state.map((daily: Daily) => ({
    x: daily.date,
    y: daily.balance,
  }))

  return (
    <>
      <FlexibleXYPlot
        xType="ordinal"
        yDomain={[domain.start, domain.end]}
        height={200}
        onMouseLeave={props.onMouseLeave}
      >
        {showEquity && (
          <LineSeries
            data={equityData}
            color={palette.equity}
            onNearestX={props.onNearestX}
          />
        )}

        {showEquity && (
          <AreaSeries
            className="area-elevated-series-2"
            color={palette.equity}
            data={equityData}
            opacity={0.1}
          />
        )}
        {showBalance && (
          <LineSeries
            data={balanceData}
            color={palette.balance}
            onNearestX={props.onNearestX}
          />
        )}

        {showBalance && (
          <AreaSeries
            className="area-elevated-series-2"
            color={palette.balance}
            data={balanceData}
            opacity={0.1}
          />
        )}

        <Crosshair values={crosshairValue}>
          <div></div>
        </Crosshair>

        <XAxis hideTicks />
        <HorizontalGridLines tickTotal={2} />
        <ChartLabel
          text={startDate}
          includeMargin={false}
          xPercent={0.025}
          yPercent={1.2}
        />
        <ChartLabel
          text={LegendLabel.xaxis}
          includeMargin={false}
          xPercent={0.9}
          yPercent={1.2}
        />
      </FlexibleXYPlot>
      <Row justify="center">
        <Col span={4}></Col>
        <Col span={8}>
          <DiscreteColorLegend
            onItemClick={props.balanceLegend}
            items={[{ title: LegendLabel.balance, color: palette.balance }]}
          />
        </Col>
        <Col span={8}>
          <DiscreteColorLegend
            onItemClick={props.equityLegend}
            items={[{ title: LegendLabel.equity, color: palette.equity }]}
          />
        </Col>
        <Col span={4}></Col>
      </Row>
    </>
  );
};
export default MainChart;
