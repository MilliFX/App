import styled from "styled-components";
export const CustomCard = styled.div`
  background-color: #ffffff;
  padding: 16px;
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

export const PostiveOrNegative = styled.div<{ value: number }>`
  font-family: Barlow;
  font-size: 14px;
  line-height: 21px;
  font-weight: 500;
  color: ${({ value }: any) =>
    (value < 0 && "#FCA311") || (value > 0 && "#02C39A") || "#000000"}; ;
`;
