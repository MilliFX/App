import { IFXBookDataDaily } from "./api/MyFXBook/index";
import { bankersRound } from "bankers-round";

export interface IChartDailyData {
  date: string;
  balance: number;
  profit: number;
  equity: number;
}

export const formatData = (dataDaily: Array<Array<IFXBookDataDaily>>) => {
  // break  Array<Array<IFXBookDataDaily>> to Array<IFXBookDataDaily>
  const dataDailyArray: Array<IFXBookDataDaily> = dataDaily.map(
    (item) => item[0]
  );

  // initiate return variable
  var result: Array<IChartDailyData> = [];

  // loop dataDailyArray and get date, balance, profit and equity
  for (let i = 0; i < dataDailyArray.length; i++) {
    // round equity to two decimals
    let roundedEquity = bankersRound(
      dataDailyArray[i].balance + dataDailyArray[i].floatingPL,
      2
    );

    let temp: IChartDailyData = {
      date: dataDailyArray[i].date,
      balance: dataDailyArray[i].balance,
      profit: dataDailyArray[i].profit,
      equity: roundedEquity,
    };

    result.push(temp);
  }

  return result;
};
