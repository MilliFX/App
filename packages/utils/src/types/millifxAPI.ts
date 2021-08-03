// For dailydata handler
export interface IDailyData {
  date: string;
  balance: number;
  profit: number;
  equity: number;
}
export interface DailyDataHandlerResponse {
  error: boolean;
  data: IDailyData[];
  errorMessage?: string;
}

// For transections handler
export interface ISingleTransection {
  action: string;
  fromCurrency: string;
  toCurrency: string;
  lots: number;
  profit: number;
}
export interface IFormattedDailyHistory {
  date: string;
  transections: ISingleTransection[];
}
export interface ITransectionHandlerResponse {
  error: boolean;
  data: {
    history: IFormattedDailyHistory[];
    dailyGain: number;
  };
  errorMessage?: string;
}
