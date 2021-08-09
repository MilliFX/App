import styled from "styled-components";
import { Col } from "antd";
import logo from "../../img/logo_top.svg";

export const Logo = styled.div`
  background-image: url(${logo});
  background-repeat: no-repeat;
  height: 32px;
  width: 82.56px;
  background-size: 100%;
  z-index: 0.5;
  margin: auto;
  margin-top: 40px;
`;
export const GreetingCardTitle = styled.div`
  font-family: Barlow;
  font-size: 16px;
  line-height: 24px;
  color: #000000;
`;

export const GreetingCardContent = styled.div`
  font-family: Barlow;
  font-size: 14px;
  line-height: 21px;
  color: #505050;
`;

export const BottomCardContent = styled.div`
  font-family: Barlow;
  font-size: 14px;
  line-height: 21px;
  color: #ffffff;
`;

export const BalanceUpOrDown = styled.div`
  font-family: Barlow;
  font-size: 14px;
  line-height: 21px;
  color: #02c39a;
`;

export const BalanceTitle = styled.div`
  font-family: Barlow;
  font-size: 12px;
  line-height: 18px;
  color: #505050;
`;

export const BalanceValue = styled.div`
  font-family: Barlow;
  font-size: 20px;
  line-height: 30px;
  color: #000000;
`;

export const CustomCard = styled.div`
  background-color: #ffffff;
  padding: 16px;
`;

export const TradeCard = styled.div`
  background-color: #ffffff;
  padding-top: 20px;
  padding-bottom: 16px;
  padding-left: 16px;
`;

export const OpenTradeTitle = styled.div`
  font-family: Barlow;
  font-size: 14px;
  line-height: 21px;
  color: #000000;
`;
