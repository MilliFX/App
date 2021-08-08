import { APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";
import { HandlerLambda, MiddlewareObject } from "middy";
import { login } from "../utils/api/MyFXBook";
import createHttpError from "http-errors";

export function myFXBookLoginMiddleware(): MiddlewareObject<
  APIGatewayEvent,
  APIGatewayProxyResult
> {
  return {
    before: async (
      handler: HandlerLambda<APIGatewayEvent, APIGatewayProxyResult>
    ): Promise<void> => {
      const { data } = await login();

      if (data.error === true) {
        throw createHttpError(500, data.message);
      } else {
        handler.event.headers["fxbook_session"] = data.session;
        return;
      }
    },
  };
}
