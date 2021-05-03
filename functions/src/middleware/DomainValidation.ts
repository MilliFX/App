import { APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";
import { HandlerLambda, MiddlewareObject } from "middy";
import createHttpError from "http-errors";
import { WHITE_LIST } from "../const/Const";

export function domainValidationMiddleWare(): MiddlewareObject<
  APIGatewayEvent,
  APIGatewayProxyResult
> {
  return {
    before: async (
      handler: HandlerLambda<APIGatewayEvent, APIGatewayProxyResult>
    ): Promise<void> => {
      const host: string = handler.event.headers["host"] || "unknown";

      if (WHITE_LIST.includes(host)) {
        return;
      }

      throw createHttpError(401, "Unauthorized Request");
    },
  };
}
