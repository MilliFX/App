// For dailydata handler
export interface DailyData {
  date: string;
  balance: number;
  profit: number;
  equity: number;
}
export interface DailyDataHandlerResponse {
  error: boolean;
  data: DailyData[];
  errorMessage?: string;
}

// For transections handler
export interface SingleTransection {
  action: string;
  fromCurrency: string;
  toCurrency: string;
  lots: number;
  profit: number;
}
export interface FormattedDailyHistory {
  date: string;
  transections: SingleTransection[];
}
export interface TransectionHandlerResponse {
  error: boolean;
  data: {
    history: FormattedDailyHistory[];
    dailyGain: number;
  };
  errorMessage?: string;
}
