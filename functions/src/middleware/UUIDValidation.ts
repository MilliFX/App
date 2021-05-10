import { APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";
import { HandlerLambda, MiddlewareObject } from "middy";
import createHttpError from "http-errors";
import { validate as uuidValidate } from "uuid";
import { version as uuidVersion } from "uuid";
import { HEADER_UUID } from "@millifx/utils"

export function uuidValidationMiddleWare(): MiddlewareObject<
  APIGatewayEvent,
  APIGatewayProxyResult
> {
  return {
    before: async (
      handler: HandlerLambda<APIGatewayEvent, APIGatewayProxyResult>
    ): Promise<void> => {
      const uuID = handler.event.headers[HEADER_UUID];

      if (uuID && uuidValidate(uuID) && uuidVersion(uuID) === 1) {
        return;
      }

      throw createHttpError(401, "Unauthorized Request");
    },
  };
}
