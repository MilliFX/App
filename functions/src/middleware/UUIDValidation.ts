import { APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";
import { HandlerLambda, MiddlewareObject } from "middy";
import createHttpError from "http-errors";
import { validate as uuidValidate } from "uuid";
import { version as uuidVersion } from "uuid";

export function uuidValidationMiddleWare(): MiddlewareObject<
  APIGatewayEvent,
  APIGatewayProxyResult
> {
  return {
    before: async (
      handler: HandlerLambda<APIGatewayEvent, APIGatewayProxyResult>
    ): Promise<void> => {
      const uuID: string = handler.event.headers["millifx-uuid"] || "unknown";

      if (uuidValidate(uuID) && uuidVersion(uuID) === 1) {
        return;
      }

      throw createHttpError(401, "Unauthorized Request");
    },
  };
}
