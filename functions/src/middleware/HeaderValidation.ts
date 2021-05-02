import { APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";
import { HandlerLambda, MiddlewareObject } from "middy";
import createHttpError from 'http-errors'


export function headerValidationMiddleWare(): MiddlewareObject <APIGatewayEvent, APIGatewayProxyResult> {
  return {
    before: async (
      handler: HandlerLambda<APIGatewayEvent, APIGatewayProxyResult>
    ): Promise<void> => {

      const host: string = handler.event.headers["host"] || "unknown";
      const uuID: string = handler.event.headers["millifx-uuid"] || "unknown";
      console.log("host is: " + host);
      console.log("uuID is: " +uuID);

      if (whiteList.includes(host) && uuID !== "unknown") {
        return;
      }
      
      throw createHttpError(401, 'Unauthorized Request');
    }
  };
}


const whiteList: Array<string> = [
  "https://app-dev.millifx.com",
  "https://app-stg.millifx.com",
  "https://app.millifx.com",
  "http://app.millifx.local",
  "localhost:8888",
];