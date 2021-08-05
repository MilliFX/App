import axios, { AxiosResponse } from "axios";
import { LoginResponse } from "./types";

export const login = (): Promise<AxiosResponse<LoginResponse>> => {
  const params = new URLSearchParams();
  params.append("email", process.env.MYFXBOOK_EMAIL ?? "");
  params.append("password", process.env.MYFXBOOK_PASSWORD ?? "");

  const config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };

  return axios.post<LoginResponse>(
    `${process.env.MYFXBOOK_API}/login.json`,
    params,
    config
  );
};
