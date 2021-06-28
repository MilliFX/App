import * as querystring from "querystring";
import axios from "axios";

export const FxBookGetAccount = (
  session: string
): Promise<IFXBookGetMyAccountSResponse> => {
  const fxBookGetAccountData: string = querystring.stringify({
    session: session,
  });

  const endPoint = {
    host: process.env.FXBOOK_URL,
    path: "/api/get-my-accounts.json",
  };
  return new Promise((resolve, reject) => {
    const getDailyEndPoint = endPoint.host + endPoint.path;
    axios.post(getDailyEndPoint, fxBookGetAccountData).then(
      (resp: any) => {
        resolve(resp.data as IFXBookGetMyAccountSResponse);
      },
      (err: Error) => {
        reject(err);
      }
    );
  });
};


export interface IFXBookGetMyAccountSResponse {
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
  