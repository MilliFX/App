import * as querystring from "querystring";
import { APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";
import { HandlerLambda, MiddlewareObject } from "middy";
import axios from "axios";

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
      var response: IFXBookResponse;

      response = await FxBookLogin();

      handler.event.headers["fxbook_error"] = response.error.toString();
      handler.event.headers["fxbook_message"] = response.message;
      handler.event.headers["fxbook_session"] = response.session;
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
