import axios, { AxiosResponse } from "axios";
import { GetDataDailyResponse } from "./types";

export const getDataDaily = (
  session: string,
  accountId: string,
  start: string,
  end: string
): Promise<AxiosResponse<GetDataDailyResponse>> => {
  return axios.post<GetDataDailyResponse>(
    `${process.env.MYFXBOOK_API}/get-data-daily.json`,
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
