import { Daily } from "./constants";

export const month = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export interface LineData {
  date: string;
  value: number;
  label: string;
}

export interface ChartProps {
  data: Daily[];
}

export enum Duration {
  Week = "Week",
  Month = "Month",
  Quarter = "Quarter",
}

export const formatDate = (d: string) => {
  const date = new Date(d);
  return `${date.getDate()} ${month[date.getMonth()]} ${date.getFullYear()}`;
};

export const LABEL_WEEK = "1W";
export const LABEL_MONTH = "1M";
export const LABEL_QUARTER = "3M";
