import * as querystring from "querystring";
import { APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";
import { HandlerLambda, MiddlewareObject } from "middy";
import axios from "axios";
import createHttpError from "http-errors";

export interface IFXBookResponse {
  error: boolean;
  message: string;
  session: string;
}

export function myFXBookLoginMiddleware(): MiddlewareObject<
  APIGatewayEvent,
  APIGatewayProxyResult
> {
  return {
    before: async (
      handler: HandlerLambda<APIGatewayEvent, APIGatewayProxyResult>
    ): Promise<void> => {
      var response: IFXBookResponse = await FxBookLogin();

      if (response.error === true) {
        throw createHttpError(500, response.message);
      } else {
        handler.event.headers["fxbook_session"] = response.session;
        return;
      }
    },
  };
}

const FxBookLogin = (): Promise<IFXBookResponse> => {
  const fxBookLoginData: string = querystring.stringify({
    email: process.env.FXBOOK_EMAIL,
    password: process.env.FXBOOK_PASSWORD,
  });

  const options = {
    host: process.env.FXBOOK_URL,
    path: "/api/login.json",
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Content-Length": Buffer.byteLength(fxBookLoginData),
    },
  };
  return new Promise((resolve, reject) => {
    const loginEndPoint = options.host + options.path;
    axios.post(loginEndPoint, fxBookLoginData).then(
      (resp: any) => {
        resolve(resp.data as IFXBookResponse);
      },
      (err: Error) => {
        reject(err);
      }
    );
  });
};
