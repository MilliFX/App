import axios, { AxiosResponse } from "axios";
import { GetDailyGainResponse } from "./types";

export const getDailyGain = (
  session: string,
  accountId: number,
  start: string,
  end: string
): Promise<AxiosResponse<GetDailyGainResponse>> => {
  return axios.post<GetDailyGainResponse>(
    `${process.env.MYFXBOOK_API}/get-daily-gain.json`,
    {},
    {
      params: {
        session: session,
        id: accountId,
        start: start,
        end: end,
      },
    }
  );
};

export * from "./types";
