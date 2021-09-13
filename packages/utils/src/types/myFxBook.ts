import { Daily, Trade, Account } from "./index";

export interface MyAccount extends Account {
  description: string;
  accountId: string;
  absGain: string;
  daily: number;
  monthly: number;
  withdrawals: number;
  deposits: number;
  interest: number;
  profit: number;
  balance: number;
  equity: number;
  equityPercent: number;
  lastUpdateDate: string;
  creationDate: string;
  firstTradeDate: string;
  commission: number;
  currency: string;
  profitFactor: number;
  pips: number;
  server: {
    name: string;
  };
}

export interface OpenTrade extends Trade {
  swap: number;
  magic: string;
}

export interface History extends Trade {
  closeTime: string;
  closePrice: number;
  interest: number;
  commission: number;
}

export interface DailyGain extends Daily {
  value: number;
}

export interface DailyRate extends Daily {
  balance: number;
  pips: number;
  lots: number;
  floatingPL: number;
  growthEquity: number;
  floatingPips: number;
}
