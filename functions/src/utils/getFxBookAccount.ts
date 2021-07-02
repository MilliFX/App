import * as querystring from "querystring";
import axios from "axios";


export interface IFXBookGetMyAccountsResponse {
  error: boolean;
  message: string;
  accounts: [
    {
      id: number;
      name: string;
      description: string;
      accountId: number;
      gain: number;
      absGain: number;
      daily: string;
      monthly: string;
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
      server: {
        name: string;
      };
    }
  ];
}



export const FxBookGetAccount = (
  session: string
): Promise<IFXBookGetMyAccountsResponse> => {

  const postData: string = querystring.stringify({
    session: session,
  });

  const endPoint: string = process.env.FXBOOK_URL + "/api/get-my-accounts.json";

  return new Promise((resolve, reject) => {

    axios.post(endPoint, {postData}).then(

      (resp: any) => {
        resolve(resp.data as IFXBookGetMyAccountsResponse);
      },

      (err: Error) => {
        reject(err);
      }

    );

  });
  
};

