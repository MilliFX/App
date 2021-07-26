import * as React from "react";
import { ITransection } from "./transectionRow";
import { default as TransectionRow } from "./transectionRow";

export interface ITransections {
  date: string;
  transections: ITransection[];
}

interface IDateRowProps {
  data: ITransections;
}

const DateRow = ({ data }: IDateRowProps) => {
  return (
    <>
      <div>
        <div>
          <div>{data.date}</div>
        </div>
        {data.transections.map((transection) => (
          <TransectionRow transection={transection} />
        ))}
      </div>
    </>
  );
};

export default DateRow;
