import styled from "styled-components";
import { Col } from "antd";

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
