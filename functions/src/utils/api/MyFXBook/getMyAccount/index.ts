import axios, { AxiosResponse } from "axios";
import { GetMyAccountsResponse } from "./types";

export const getMyAccounts = (
  session: string
): Promise<AxiosResponse<GetMyAccountsResponse>> => {
  return axios.post<GetMyAccountsResponse>(
    `${process.env.MYFXBOOK_API}/get-my-accounts.json`,
    {},
    {
      params: {
        session,
      },
    }
  );
};

export * from "./types";
