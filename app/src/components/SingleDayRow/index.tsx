import * as React from "react";
import { Transection } from "../SingleTransectionRow/";
import { default as TransectionRow } from "../SingleTransectionRow";
import { StyleDateTitle, StyleDateWrapper } from "./styles";

export interface Transections {
  date: string;
  transections: Transection[];
}

interface DateRowProps {
  data: Transections;
}

const DayRow = ({ data }: DateRowProps) => {
  return (
    <StyleDateWrapper>
      <StyleDateTitle>{data.date}</StyleDateTitle>
      {data.transections.map((transection, key) => (
        <TransectionRow transection={transection} key={key} />
      ))}
    </StyleDateWrapper>
  );
};

export default DayRow;
