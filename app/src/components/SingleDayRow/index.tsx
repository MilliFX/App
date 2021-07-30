import * as React from "react";
import { ITransection } from "../SingleTransectionRow/";
import { default as TransectionRow } from "../SingleTransectionRow";
import { StyleDateTitle, StyleDateWrapper } from "./styles";

export interface ITransections {
  date: string;
  transections: ITransection[];
}

interface IDateRowProps {
  data: ITransections;
}

const DayRow = ({ data }: IDateRowProps) => {
  return (
    <>
      <StyleDateWrapper>
        <StyleDateTitle>{data.date}</StyleDateTitle>
        {data.transections.map((transection, key) => (
          <TransectionRow transection={transection} key={key} />
        ))}
      </StyleDateWrapper>
    </>
  );
};

export default DayRow;
