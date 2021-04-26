import { Daily } from "../../utils/constants";
import {  Row, Col } from "antd";

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

interface ChartProps {
  data: Daily[];
}

const FlexibleXYPlot = makeWidthFlexible(XYPlot);
const palette = {
  balance: "#EB5757",
  equity: "#2F80ED",
  profitPositive: "#F2994A",
  profitNegative: "#6FCF97",
};

const Animation = (props: any) => {
  const { domain, state, showEquity, showBalance, startDate } = props.data;
  const {
    onMouseLeave,
    onNearestX,
    balanceLegend,
    equityLegend,
  } = props.handleClick;

  return (
    <>
      <FlexibleXYPlot
        xType="ordinal"
        yDomain={[domain.start, domain.end]}
        height={window.innerHeight * 0.3}
        onMouseLeave={onMouseLeave}
      >
        {showEquity && (
          <LineSeries
            data={state.map((daily: Daily) => ({
              x: daily.date,
              y: daily.equity,
            }))}
            color={palette.equity}
            onNearestX={onNearestX}
          />
        )}
        {showBalance && (
          <LineSeries
            data={state.map((daily: Daily) => ({
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
            onItemClick={balanceLegend}
            items={[{ title: "Balance", color: palette.balance }]}
          />
        </Col>
        <Col span={10}>
          <DiscreteColorLegend
            onItemClick={equityLegend}
            items={[{ title: "Equity", color: palette.equity }]}
          />
        </Col>
      </Row>
    </>
  );
};
export default Animation;
