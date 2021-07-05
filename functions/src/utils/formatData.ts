import {IFXBookDataDaily} from "./api/MyFXBook/index";

export interface IChartDailyData {
    date: string;
    balance: number;
    profit: number;
    equity: number;
}

export const formatData = (dataDaily: Array<Array<IFXBookDataDaily>>) => {
 
    // break  Array<Array<IFXBookDataDaily>> to Array<IFXBookDataDaily>
    const dataDailyArray: Array<IFXBookDataDaily> = dataDaily.map( item => item[0]);

    // initiate return variable
    var result: Array<IChartDailyData> = [];

    // loop dataDailyArray and get date, balance, profit and equity
    for(let i=0; i<dataDailyArray.length; i++){

        let temp: IChartDailyData = {
            date: dataDailyArray[i].date,
            balance: dataDailyArray[i].balance,
            profit: dataDailyArray[i].profit,
            equity: dataDailyArray[i].balance + dataDailyArray[i].floatingPL
        };

        result.push(temp);
    }
    
    return result;
}


