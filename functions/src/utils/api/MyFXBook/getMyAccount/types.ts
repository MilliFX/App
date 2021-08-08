export interface Server {
  name: string;
}

export interface MyAccount {
  id: number;
  name: string;
  description: string;
  accountId: number;
  gain: number;
  absGain: number;
  daily: number;
  monthly: number;
  withdrawals: number;
  deposits: number;
  interest: number;
  profit: number;
  balance: number;
  drawdown: number;
  equity: number;
  equityPercent: number;
  demo: boolean;
  lastUpdateDate: string;
  creationDate: string;
  firstTradeDate: string;
  tracking: number;
  views: number;
  commission: number;
  currency: string;
  profitFactor: number;
  pips: number;
  invitationUrl: string;
  server: Server;
}

export interface GetMyAccountsResponse {
  error: boolean;
  message: string;
  accounts: MyAccount[];
}
