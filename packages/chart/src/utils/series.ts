import { mockData, Daily } from "../utils/constants";
import {useState, useEffect} from 'react';
// import { needDayLong } from '../components/Chart/index';

interface DataArray {
    x: string;
    y: number;
}
interface Series{
    name: string;
    type: "area" | "line";
    data: DataArray[];
}

// export const testdata = needDayLong;
//1. one week data==> past 7 days data
const altArray: Daily[] = [];
// const dataPiece = mockData.slice(mockData.length - needDayLong)
const dataPiece = mockData.slice(mockData.length - 7)
//Formate the data
for(let i = 0;i<dataPiece.length;i++){
    const dateFormate = dataPiece[i].date
    switch(dateFormate.slice(0,2)){
        case "01": 
            altArray.push({date: `${dateFormate.slice(3,5)} Jan ${dateFormate.slice(6)}`, balance: dataPiece[i].balance, profit:dataPiece[i].profit, equity:dataPiece[i].equity})
            break;
        case "02":
            altArray.push({date: `${dateFormate.slice(3,5)} Feb ${dateFormate.slice(6)}`, balance: dataPiece[i].balance, profit:dataPiece[i].profit, equity:dataPiece[i].equity})
            break;
        case "03":
            altArray.push({date: `${dateFormate.slice(3,5)} Mar ${dateFormate.slice(6)}`, balance: dataPiece[i].balance, profit:dataPiece[i].profit, equity:dataPiece[i].equity})
            break;
        case "04":
            altArray.push({date: `${dateFormate.slice(3,5)} Apr ${dateFormate.slice(6)}`, balance: dataPiece[i].balance, profit:dataPiece[i].profit, equity:dataPiece[i].equity})
            break;
        case "05":
            altArray.push({date: `${dateFormate.slice(3,5)} May ${dateFormate.slice(6)}`, balance: dataPiece[i].balance, profit:dataPiece[i].profit, equity:dataPiece[i].equity})
            break;
        case "06":
            altArray.push({date: `${dateFormate.slice(3,5)} Jun ${dateFormate.slice(6)}`, balance: dataPiece[i].balance, profit:dataPiece[i].profit, equity:dataPiece[i].equity})
            break;
        case "07":
            altArray.push({date: `${dateFormate.slice(3,5)} July ${dateFormate.slice(6)}`, balance: dataPiece[i].balance, profit:dataPiece[i].profit, equity:dataPiece[i].equity})
            break;
        case "08":
            altArray.push({date: `${dateFormate.slice(3,5)} Aug ${dateFormate.slice(6)}`, balance: dataPiece[i].balance, profit:dataPiece[i].profit, equity:dataPiece[i].equity})
            break;
        case "09":
            altArray.push({date: `${dateFormate.slice(3,5)} Sep ${dateFormate.slice(6)}`, balance: dataPiece[i].balance, profit:dataPiece[i].profit, equity:dataPiece[i].equity})
            break;
        case "10":
            altArray.push({date: `${dateFormate.slice(3,5)} Oct ${dateFormate.slice(6)}`, balance: dataPiece[i].balance, profit:dataPiece[i].profit, equity:dataPiece[i].equity})
            break;
        case "11":
            altArray.push({date: `${dateFormate.slice(3,5)} Nov ${dateFormate.slice(6)}`, balance: dataPiece[i].balance, profit:dataPiece[i].profit, equity:dataPiece[i].equity})
            break;
        case "12":
            altArray.push({date: `${dateFormate.slice(3,5)} Dec ${dateFormate.slice(6)}`, balance: dataPiece[i].balance, profit:dataPiece[i].profit, equity:dataPiece[i].equity})
            break;
    }
}
// divide the data into 3 groups
const resultData = altArray.map(
    (item)=>{
        const currentBalance: DataArray = {
            x: item.date,
            y: item.balance
        }
        const currentEquity: DataArray = {
            x: item.date,
            y: item.equity
        }
        const currentProfit: DataArray ={
            x: item.date,
            y:item.profit
        }
        return {
            currentBalance,
            currentEquity,
            currentProfit
        }
    }
)
//destructor of one week data into seperate data pair
export const balance: DataArray[] = resultData.map(
    (item)=>{
        return item.currentBalance
    }
)
export const equity: DataArray[] = resultData.map(
    (item)=>{
        return item.currentEquity
    }
)
export const profit: DataArray[] = resultData.map(
    (item)=>{
        return item.currentProfit
    }
)
//export itemProfit to provide the lable bar content
export const series: Series[] = [
    {
        name: "Balance",
        type: "area",
        data: balance,
    },
    {
        name: "Equity",
        type: "area",
        data: equity,
    },
]
//2. one month data ==> past 30 days data
