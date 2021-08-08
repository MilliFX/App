import axios, { AxiosResponse } from "axios";
import { GetHistoryResponse } from "./types";

export const getHistory = (
  session: string,
  accountId: string
): Promise<AxiosResponse<GetHistoryResponse>> => {
  return axios.post<GetHistoryResponse>(
    `${process.env.MYFXBOOK_API}/get-history.json`,
    {},
    {
      params: {
        session: session,
        id: accountId,
      },
    }
  );
};

export * from "./types";
