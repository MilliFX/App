import styled from "styled-components";
import { Col } from "antd";
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

export const StyleDateTitle = styled.div`
  font-family: Barlow;
  font-size: 12px;
  font-weight: 400;
  line-height: 1.5;
  color: #505050;
  padding-bottom: 8px;
`;

export const StyleDateWrapper = styled.div`
  padding: 20px 20px 0 20px;
  background-color: #ffffff;
`;

export const StyleAntCol = styled(Col)`
  background-color: #e5e5e5;
`;

export const StyleHeroWrapper = styled.div`
  padding: 40px 20px 20px 20px;
`;

export const StyleHeroTitle = styled.h1`
  font-family: Barlow;
  font-weight: 600;
  font-size: 20px;
  line-height: 1.5;
  color: #000000;
`;

export const StyleHeroDataWrapper = styled.div`
  background-color: #ffffff;
  padding: 16px;
`;

export const StyleHeroDataTitle = styled.div`
  font-family: Barlow;
  font-weight: 400;
  font-size: 12px;
  line-height: 1.5;
  color: #505050;
  margin-bottom: 2px;
`;

export const StyleHeroDataFigure = styled.div<{ profit: number }>`
  font-family: Barlow;
  font-size: 20px;
  line-height: 1.5;
  font-weight: 600;
  color: ${({ profit }: any) =>
    (profit < 0 && "#FCA311") || (profit > 0 && "#02C39A") || "#000000"};
`;
