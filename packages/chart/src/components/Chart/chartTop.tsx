import { Daily } from "../../utils/constants";
import { LegendStyle, Legend, ProfitStyle } from "../CSS/styled_components.js";

function ChartTop(props: Daily) {
  return (
    <>
      <Legend>{props.date}</Legend>
      <div>
        <LegendStyle>
          <Legend>Equity</Legend>
          <h2>${props.equity.toLocaleString()}</h2>
        </LegendStyle>
        <LegendStyle>
          <Legend>Balance</Legend>
          <h2>${props.balance.toLocaleString()}</h2>
        </LegendStyle>
        <div>
          <Legend>Profit</Legend>
          <ProfitStyle>{props.profit.toFixed(2)}%</ProfitStyle>
        </div>
      </div>
    </>
  );
}

export default ChartTop;
