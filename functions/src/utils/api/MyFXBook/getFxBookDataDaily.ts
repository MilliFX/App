import axios from "axios";
import * as querystring from "querystring";

export interface IFXBookGetDataDailyResponse {
  error: boolean;
  message: string;
  dataDaily: [[FXBookDataDaily]];
}

export interface FXBookDataDaily {
  date: string;
  balance: number;
  pips: number;
  lots: number;
  floatingPL: number;
  profit: number;
  growthEquity: number;
  floatingPips: number;
}

export const FxBookGetDataDaily = (
  session: string,
  accountId: string,
  start: string,
  end: string
): Promise<IFXBookGetDataDailyResponse> => {
  const postData: string = querystring.stringify({
    session: session,
    id: accountId,
    start: start,
    end: end,
  });

  const endPoint: string = process.env.FXBOOK_URL + "/api/get-data-daily.json";

  return new Promise((resolve, reject) => {
    axios.post(endPoint, postData).then(
      (resp: any) => {
        resolve(resp.data as IFXBookGetDataDailyResponse);
      },

      (err: Error) => {
        reject(err);
      }
    );
  });
};
