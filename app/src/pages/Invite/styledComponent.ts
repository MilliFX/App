import styled from "styled-components";
import BackgroundSVG from "../../img/background.svg";

export const SVGWrapper = styled.div`
  background: url(${BackgroundSVG});
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;
export const Brand = styled.div`
  height: 80px;
  width: 160px;
  background-size: 100%;
  z-index: 0.5;
  margin-top: 120px;
`;

export const Slogan = styled.div`
  font-family: Barlow;
  font-style: normal;
  font-weight: normal;
  width: 320px;
  height: 24px;
  font-size: 16px;
  line-height: 24px;
  color: #505050;
  margin-top: 88px;
`;
export const EnterButton = styled.div`
  width: 240px;
  margin-top: 40px;
  height: 44px;
`;

export const FormWrapper = styled.div`
  width: 320px;
  height: auto;
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
export const LabelNormal = styled.div`
  width: 320px;
  font-family: Barlow;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 19px;
  margin-top: 40px;
  margin-bottom: 8px;
  color: #505050;
`;

export const LabelWarning = styled.div`
  width: 320px;
  font-family: Barlow;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 19px;
  margin-top: 40px;
  margin-bottom: 8px;
  color: #fca311;
`;

export const InputWrapper = styled.div`
  width: 320px;
  margin-bottom: 40px;
`;

export const ButtonWrapper = styled.div`
  width: 320px;
  margin-bottom: 8px;
`;
export const ModalMessage = styled.div`
  width: 216px;
  height: 48px;
  font-family: Barlow;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  color: #505050;
`;
export const HelpMessage = styled.div`
  font-family: Barlow;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 18px;
  color: #fca311;
`;
