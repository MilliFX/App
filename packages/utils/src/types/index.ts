import { Action } from "./enums";

export interface Account {
  id: number;
  name: string;
  gain: number;
  drawdown: number;
  demo: boolean;
  change: number;
}

export interface Size {
  type: string;
  value: string;
}

export interface Trade {
  openTime: string;
  symbol: string;
  action: Action;
  sizing: Size;
  openPrice: number;
  tp: number;
  sl: 0;
  pips: number;
  profit: number;
  comment: string;
}

export interface Daily {
  date: string;
  profit: number;
}
