import axios from "axios";
import * as querystring from "querystring";

export interface IFXBookGetDailyGainResponse {
  error: boolean;
  message: string;
  dailyGain: [[IFXBookDailyGain]];
}

export interface IFXBookDailyGain {
  date: string;
  balance: number;
  profit: number;
  equity: number;
}

export const FxBookGetDaily = (
  session: string,
  accountId: string,
  start: string,
  end: string
): Promise<IFXBookGetDailyGainResponse> => {
  const postData: string = querystring.stringify({
    session: session,
    id: accountId,
    start: start,
    end: end,
  });

  const endPoint: string = process.env.FXBOOK_URL + "/api/get-daily-gain.json";

  return new Promise((resolve, reject) => {
    axios.post(endPoint, postData).then(
      (resp: any) => {
        resolve(resp.data as IFXBookGetDailyGainResponse);
      },

      (err: Error) => {
        reject(err);
      }
    );
  });
};
