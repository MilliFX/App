import styled from "styled-components";

export const StyleRow = styled.div`
  display: flex;
  border-bottom: 1px solid #e7ebef;
  padding: 12px 0;
  font-size: 14px;
  line-height: 1.5;
  font-weight: 500;
  font-family: Barlow;
`;

export const StyleActionCol = styled.div<{ action: string }>`
  flex: 0 0 25%;
  width: 25%;

  color: ${({ action }: any) =>
    (action === "SELL" && "#02C39A") ||
    (action === "BUY" && "#FCA311") ||
    "#000000"};
`;

export const StyleCurrencyCol = styled.div`
  flex: 0 0 35%;
  width: 35%;
  color: #505050;
`;

export const StyleLotsCol = styled.div`
  flex: 0 0 10%;
  width: 10%;
  color: #505050;
`;

export const StyleProfitCol = styled.div<{ profit: number }>`
  flex: 0 0 30%;
  width: 30%;
  text-align: right;
  color: ${({ profit }: any) =>
    (profit < 0 && "#FCA311") || (profit > 0 && "#02C39A") || "#000000"};
`;
