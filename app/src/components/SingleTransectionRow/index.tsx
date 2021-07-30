import * as React from "react";
import {
  StyleRow,
  StyleActionCol,
  StyleCurrencyCol,
  StyleLotsCol,
  StyleProfitCol,
} from "./styles";
import { formatCurrency } from "../../utils/formatCurrency";

export interface ITransection {
  action: string;
  fromCurrency: string;
  toCurrency: string;
  lots: number;
  profit: number;
}

interface ITransectionRowProps {
  transection: ITransection;
}

const TransectionRow = ({ transection }: ITransectionRowProps) => {
  return (
    <StyleRow>
      <StyleActionCol action={transection.action}>
        {transection.action}
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
