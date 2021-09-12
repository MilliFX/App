import axios from "axios";
import * as querystring from "querystring";

type actions = "BUY" | "SELL";

export interface IFXBookGetOpenTradesResponse {
    error: boolean;
    message: string;
    openTrades: IFXBookSingleDailyTrade[];
  }

export interface IFXBookSingleDailyTrade {
    openTime: string;
    symbol: string;
    action: actions;
    sizing: IFXBookSingleSizing;
    openPrice: number;
    tp: number;
    sl: number;
    comment: string;
    profit: number;
    pips: number;
    swap: number;
    magic: string;
}

export interface IFXBookSingleSizing {
    type:string;
    value:string;
}

export const FxBookGetOpenTrades = (
    session: string,
    accountId: number
  ): Promise<IFXBookGetOpenTradesResponse> => {
    const postData: string = querystring.stringify({
      session: session,
      id: accountId,
    });
  
    const endPoint: string = process.env.FXBOOK_URL + "/api/get-open-trades.json";
  
    return new Promise((resolve, reject) => {
      axios.post(endPoint, postData).then(
        (resp: any) => {
          resolve(resp.data as IFXBookGetOpenTradesResponse);
        },
  
        (err: Error) => {
          reject(err);
        }
      );
    });
  };