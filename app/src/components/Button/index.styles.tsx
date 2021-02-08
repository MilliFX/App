import styled, { css } from "styled-components";
import { COLOR } from "../Color";
// import { SIZE } from "../Size";

export interface ButtonProps {
  isDisabled?: boolean;
  // size?: SIZE;
}

export const Button = styled.button<ButtonProps>`
  /*
  Reset Default HTML Style
   */
  border: none;

  /*
  Default Size
   */
  height: 40px;
  width: 120px;

  /*
  States
   */
  ${({ isDisabled }) =>
    !isDisabled
      ? css`
          color: ${COLOR.WHITE};
          background-color: ${COLOR.PRIMARY};
        `
      : css`
          color: ${COLOR.BLACK};
          background-color: ${COLOR.BACKGROUND};
        `}
`;
