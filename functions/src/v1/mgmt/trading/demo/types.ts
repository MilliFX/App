export interface Income {
  accountName: string;
  monthly: number;
}

export interface DemoAccount {
  account: number;
  name: string;
  description: string;
  withdrawals: number;
  gain: number;
  absGain: number;
  balance: number;
  equity: number;
  monthly: number;
  drawdown: number;
  currency: string;
  profitFactor: number;
  creationDate: string;
  lastUpdateDate: string;
}
