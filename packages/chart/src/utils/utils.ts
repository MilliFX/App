import { Daily } from './constants';

export const month = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
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
  Week = 'Week',
  Month = 'Month',
  Quarter = 'Quarter',
}

export const formatDate = (d: string) => {
  const options:Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  const date = new Date(d).toLocaleDateString('en-US',options);
  return date;
};

export const LABEL_WEEK = '1W';
export const LABEL_MONTH = '1M';
export const LABEL_QUARTER = '3M';
