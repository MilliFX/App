import { Daily, palette } from "../../utils/constants";
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
  Crosshair
} from "react-vis";
import "../../../node_modules/react-vis/dist/style.css";
import "antd/dist/antd.css";

// interface ChartProps {
//   data: Daily[];
// }

const FlexibleXYPlot = makeWidthFlexible(XYPlot);
const MainChart = (props: any) => {
  const { domain, state, showEquity, showBalance, startDate ,crosshairValue} = props.data;

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
            data={state.map((daily: Daily) => ({
              x: daily.date,
              y: daily.equity,
            }))}
            color={palette.equity}
            onNearestX={props.onNearestX}
          />
        )}
        {showEquity && (
          <AreaSeries
            className="area-elevated-series-2"
            color={palette.equity}
            data={state.map((daily: Daily) => ({
              x: daily.date,
              y: daily.equity,
            }))}
            opacity={0.1}
          />
        )}

        {showBalance && (
          <LineSeries
            data={state.map((daily: Daily) => ({
              x: daily.date,
              y: daily.balance,
            }))}
            color={palette.balance}
            onNearestX={props.onNearestX}
          />
        )}

        {showBalance && (
          <AreaSeries
            className="area-elevated-series-2"
            color={palette.balance}
            data={state.map((daily: Daily) => ({
              x: daily.date,
              y: daily.balance,
            }))}
            opacity={0.1}
          />
        )}
        <Crosshair values={crosshairValue} >
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
          text="Today"
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
            items={[{ title: "Balance", color: palette.balance }]}
          />
        </Col>
        <Col span={8}>
          <DiscreteColorLegend
            onItemClick={props.equityLegend}
            items={[{ title: "Equity", color: palette.equity }]}
          />
        </Col>
        <Col span={4}></Col>
      </Row>
    </>
  );
};
export default MainChart;
