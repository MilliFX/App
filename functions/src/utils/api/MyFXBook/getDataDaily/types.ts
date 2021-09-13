export interface GetDataDailyResponse {
  error: boolean;
  message: string;
  dataDaily: [[DataDaily]];
}

export interface DataDaily {
  date: string;
  balance: number;
  pips: number;
  lots: number;
  floatingPL: number;
  profit: number;
  growthEquity: number;
  floatingPips: number;
}
