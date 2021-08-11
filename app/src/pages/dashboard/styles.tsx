import styled from "styled-components";
import logo from "../../img/logo_top.svg";

export const DashboardContainer = styled.div`
  position: absolute;
  width: 360px;
  height: 607.5px;
  left: 0px;
  top: 0px;
  background: #f9fafb;
  border-radius: 4px;
`;

export const Logo = styled.div`
  background-image: url(${logo});
  height: 32px;
  width: 82.56px;
  background-size: 100%;
  z-index: 0.5;
  margin: auto;
  margin-top: 40px;
  margin-left: 138px;
  margin-bottom: 20px;
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
  z-index: 2;
`;

export const PositiveValue = styled.div`
  font-family: Barlow;
  font-size: 14px;
  line-height: 21px;
  font-weight: 500;
  color: #02c39a;
`;

export const NegativeValue = styled.div`
  font-family: Barlow;
  font-size: 14px;
  line-height: 21px;
  font-weight: 500;
  color: #fca311;
`;

export const BalanceTitle = styled.div`
  font-family: Barlow;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 18px;
  color: #505050;
`;

export const BalanceValue = styled.div`
  font-family: Barlow;
  font-size: 20px;
  line-height: 30px;
  font-style: normal;
  font-weight: 600;
  color: #000000;
  padding-bottom: 12px;
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
  padding-bottom: 20px;
`;

export const TinyRectangle1 = styled.div`
  position: absolute;
  width: 156px;
  height: 9px;
  margin-top: 45px;
  margin-right: 117.97px;
  background: linear-gradient(
    90deg,
    rgba(76, 224, 179, 0) 0.05%,
    #261058 100.97%
  );
  transform: rotate(-45deg);
`;
