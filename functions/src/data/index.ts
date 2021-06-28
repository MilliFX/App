import {
  APIGatewayEvent,
  APIGatewayProxyResult,
  APIGatewayProxyHandler,
} from "aws-lambda";
import middy from "middy";
import { uuidValidationMiddleWare } from "../middleware/UUIDValidation";
import { domainValidationMiddleWare } from "../middleware/DomainValidation";
import { myFXBookLoginMiddleware } from "../middleware/MyFXBookLogin";
import axios from "axios";
import * as querystring from "querystring";
import {
  FxBookGetAccount,
  IFXBookGetMyAccountSResponse,
} from "../utils/getFxBookAccount";

export interface HelloResponse {
  message: string;
}

export const helloHandler = async (
  event: APIGatewayEvent
): Promise<APIGatewayProxyResult> => {
  console.log(event);

  const start = event.queryStringParameters?.start;
  const end = event.queryStringParameters?.end;

  if (
    event.headers["fxbook_error"] === "false" &&
    event.headers["fxbook_session"]
  ) {
    var fxBookAccountData: IFXBookGetMyAccountSResponse;

    fxBookAccountData = await FxBookGetAccount(event.headers["fxbook_session"]);

    if (fxBookAccountData.error === false && fxBookAccountData.accounts[0].accountId) {
      
    }
  }

  //console.log(event.headers);

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: 'JSON.stringify()',
  };
};

const FxBookGetDaily = (session: string): Promise<IFXBookGetDailyResponse> => {
  const fxBookLoginData: string = querystring.stringify({
    session: session,
    password: process.env.FXBOOK_PASSWORD,
  });

  const endPoint = {
    host: process.env.FXBOOK_URL,
    path: "/api/get-daily-gain.json",
  };
  return new Promise((resolve, reject) => {
    const getDailyEndPoint = endPoint.host + endPoint.path;
    axios.post(getDailyEndPoint, fxBookLoginData).then(
      (resp: any) => {
        resolve(resp.data as IFXBookGetDailyResponse);
      },
      (err: Error) => {
        reject(err);
      }
    );
  });
};

interface IFXBookGetDailyResponse {
  error: boolean;
  message: string;
  dailyGain: [
    [
      {
        date: "02/01/2010";
        value: 0.07;
        profit: 0.03;
      }
    ]
  ];
}

export const handler: APIGatewayProxyHandler = middy(helloHandler)
  .use(domainValidationMiddleWare())
  .use(uuidValidationMiddleWare())
  .use(myFXBookLoginMiddleware());
