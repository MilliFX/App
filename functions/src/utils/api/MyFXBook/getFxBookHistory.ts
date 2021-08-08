import axios from "axios";
import * as querystring from "querystring";

export interface FXBookGetHistoryResponse {
  error: boolean;
  message: string;
  history: FXBookHistoryDaily[];
}

export interface FXBookHistoryDaily {
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

export const FxBookGetHistory = (
  session: string,
  accountId: string
): Promise<FXBookGetHistoryResponse> => {
  const postData: string = querystring.stringify({
    session: session,
    id: accountId,
  });

  const endPoint: string = process.env.MYFXBOOK_API + "/get-history.json";

  return new Promise((resolve, reject) => {
    axios.post(endPoint, postData).then(
      (resp: any) => {
        resolve(resp.data as FXBookGetHistoryResponse);
      },

      (err: Error) => {
        reject(err);
      }
    );
  });
};
