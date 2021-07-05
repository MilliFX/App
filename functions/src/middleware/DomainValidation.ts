import { APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";
import { HandlerLambda, MiddlewareObject } from "middy";
import createHttpError from "http-errors";
import { WHITE_LIST } from "../utils/const";

export function domainValidationMiddleWare(): MiddlewareObject<
  APIGatewayEvent,
  APIGatewayProxyResult
> {
  return {
    before: async (
      handler: HandlerLambda<APIGatewayEvent, APIGatewayProxyResult>
    ): Promise<void> => {
      const host = handler.event.headers["host"];

      if (host && WHITE_LIST.includes(host)) {
        return;
      }

      throw createHttpError(401, "Unauthorized Request");
    },
  };
}
