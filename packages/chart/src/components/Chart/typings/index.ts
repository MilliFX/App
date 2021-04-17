export interface IData {
    date:string,
    balance:number,
    profit:number,
    equity:number
}

export enum monthEnum {
    'Jan' = 1,
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
    'Dec'
}

export enum Duration {
    "1W"=7,
    "1M"=30,
    "3M"=90
}