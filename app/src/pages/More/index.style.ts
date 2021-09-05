import styled from "styled-components";
import BackgroundSVG from "../../img/background.svg";

export const Wrapper = styled.div`
  background: url(${BackgroundSVG});
`;

export const StyledTitle = styled.h1`
  font-family: Barlow;
  font-weight: 600;
  font-size: 20px;
  line-height: 1.5;
  color: #000000;
`;

export const TopWrapper = styled.div`
  padding-top: 40px;
  padding-bottom: 20px;
  padding-left: 20px;
`;

export const BottomWrapper = styled.div`
  height: auto;
  background-color: #ffffff;
`;
export const Navigation = styled.div`
  padding: 0 20px;
`;

export const NavigationItem = styled.div`
  height: 60px;
  padding: 20px 0;
  color: #505050;
  border-bottom: 1px solid #e7ebef;
`;

export const NavigationLink = styled.a`
  color: #505050;
  font-family: Barlow;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 20px;
  display: flex;
  align-items: center;
  span {
    margin-right: 10px;
  }
`;
