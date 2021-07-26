import * as React from "react";

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
    <>
      <div>
        <div>{transection.action}</div>
        <div>
          {transection.fromCurrency} &gt; {transection.toCurrency}
        </div>
        <div>{transection.lots}</div>
        <div>{transection.profit}</div>
      </div>
    </>
  );
};

export default TransectionRow;
