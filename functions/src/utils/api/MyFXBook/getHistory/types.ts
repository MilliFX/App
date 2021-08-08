export interface GetHistoryResponse {
  error: boolean;
  message: string;
  history: History[];
}

export interface History {
  openTime: string;
  closeTime: string;
  symbol: string;
  action: string;
  sizing: {
    type: string;
    value: number;
  };
  openPrice: number;
  closePrice: number;
  tp: number;
  sl: number;
  pips: number;
  profit: number;
  comment: string;
  interest: number;
  commission: number;
}
