import React from "react";
import {
  StyleRow,
  StyleActionCol,
  StyleCurrencyCol,
  StyleLotsCol,
  StyleProfitCol,
} from "./styles";
import { formatCurrency } from "../../utils/formatCurrency";

export interface Transection {
  action: string;
  fromCurrency: string;
  toCurrency: string;
  lots: number;
  profit: number;
}

interface TransectionRowProps {
  transection: Transection;
}

const TransectionRow: React.FC<TransectionRowProps> = ({ transection }) => {
  return (
    <StyleRow>
      <StyleActionCol action={transection.action.toUpperCase()}>
        {transection.action.toUpperCase()}
      </StyleActionCol>
      <StyleCurrencyCol>
        {transection.fromCurrency} &gt; {transection.toCurrency}
      </StyleCurrencyCol>
      <StyleLotsCol>{transection.lots}</StyleLotsCol>
      <StyleProfitCol profit={transection.profit}>
        {formatCurrency(transection.profit)}
      </StyleProfitCol>
    </StyleRow>
  );
};

export default TransectionRow;
