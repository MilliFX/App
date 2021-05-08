import { Daily } from "../../../utils/constants";
import { StyledLegend, Legend, ProfitStyle } from "./style";

const ChartTop = ({ date, equity, balance, profit }: Daily) => {
  return (
    <>
      <Legend>{date}</Legend>
      <div>
        <StyledLegend>
          <Legend>Equity</Legend>
          <h2>${equity.toLocaleString()}</h2>
        </StyledLegend>
        <StyledLegend>
          <Legend>Balance</Legend>
          <h2>${balance.toLocaleString()}</h2>
        </StyledLegend>
        <div>
          <Legend>Profit</Legend>
          <ProfitStyle>{profit.toFixed(2)}%</ProfitStyle>
        </div>
      </div>
    </>
  );
};

export default ChartTop;
