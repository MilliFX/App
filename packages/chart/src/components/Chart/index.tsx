import * as React from 'react';
import { Daily } from '../../utils/constants';
import { createConfig } from '../../utils/config';
import ChartTop from './ChartTop';
import { Options } from '@ant-design/charts/es/hooks/useChart';
import { ChartWrapper, Wrapper } from './style';
import {
  ChartProps,
  LineData,
  Duration,
  LABEL_WEEK,
  LABEL_MONTH,
  LABEL_QUARTER,
  formatDate,
} from '../../utils/utils';

const Chart = ({ data }: ChartProps) => {
  const numberOfDays = data.length;
  const isDataLessThanAWeek = numberOfDays < 7;
  const isDataLessThanAMonth = numberOfDays < 30;
  const isDataLessThanAQuarter = numberOfDays < 90;

  const weekData = isDataLessThanAWeek
    ? data
    : data.slice(numberOfDays - 7, numberOfDays);
  const monthData = isDataLessThanAMonth
    ? data
    : data.slice(numberOfDays - 30, numberOfDays);
  const quarterData = isDataLessThanAQuarter
    ? data
    : data.slice(numberOfDays - 90, numberOfDays);

  const currentDailyDate = data[numberOfDays - 1];
  const [newData, setNewdata] = React.useState(weekData);
  const [currentEquity, setCurrentEquity] = React.useState(
    currentDailyDate.equity
  );
  const [currentBalance, setCurrentBalance] = React.useState(
    currentDailyDate.balance
  );
  const [date, setDate] = React.useState(formatDate(currentDailyDate.date));

  const handleDuration = (e: React.MouseEvent) => {
    const target = e.target as HTMLTextAreaElement;
    const duration = target.value;
    setNewdata(
      duration === Duration.Week
        ? weekData
        : duration === Duration.Month
        ? monthData
        : quarterData
    );
  };

  const equityArray = newData.map(
    (daily: Daily): LineData => {
      return {
        date: daily.date,
        value: daily.equity,
        label: 'equity',
      };
    }
  );

  const balanceArray = newData.map(
    (daily: Daily): LineData => {
      return {
        date: daily.date,
        value: daily.balance,
        label: 'balance',
      };
    }
  );

  const yValue = [...equityArray, ...balanceArray];

  const dataChange = (line: Options) => {
    line.on('tooltip:change', (evt: Options) => {
      const { title, items } = evt.data;
      setCurrentEquity(
        items.find((item: Options) => item.data.label === 'equity').data.value
      );
      setCurrentBalance(
        items.find((item: Options) => item.data.label === 'balance').data.value
      );
      setDate(title);
    });
  };

  const parameter = {
    date: date,
    equity: currentEquity,
    balance: currentBalance,
    profit: ((currentBalance - currentEquity) / currentBalance) * 100,
  };

  return (
    <>
      <Wrapper>
        <ChartTop {...parameter}></ChartTop>
        <ChartWrapper
          {...createConfig(yValue)}
          onReady={(line: Options) => {
            dataChange(line);
          }}
        />

        <button value={Duration.Week} onClick={handleDuration}>
          {LABEL_WEEK}
        </button>
        <button value={Duration.Month} onClick={handleDuration}>
          {LABEL_MONTH}
        </button>
        <button value={Duration.Quarter} onClick={handleDuration}>
          {LABEL_QUARTER}
        </button>
      </Wrapper>
    </>
  );
};

export default Chart;
