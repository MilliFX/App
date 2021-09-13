export interface GetDailyGainResponse {
  error: boolean;
  message: string;
  dailyGain: [[DailyGain]];
}

export interface DailyGain {
  date: string;
  balance: number;
  profit: number;
  equity: number;
}
