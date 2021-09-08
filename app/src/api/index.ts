import axios, { AxiosResponse } from "axios";
import { UUID_FIELD } from "../utils/constants";
import { TransectionHandlerResponse } from "@millifx/utils";

export const fetchTransectionData = (): Promise<
  AxiosResponse<TransectionHandlerResponse>
> => {
  return axios.get<TransectionHandlerResponse>("/api/transections", {
    headers: {
      "millifx-uuid": localStorage[UUID_FIELD],
    },
  });
};
