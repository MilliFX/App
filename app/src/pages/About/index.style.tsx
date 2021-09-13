import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

export const AboutWrapper = styled.div`
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 320px;
`;

export const AboutDescription = styled.div`
  margin-top: 40px;
  font-family: Barlow;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #505050;
  span {
    color: #e71f18;
  }
`;
