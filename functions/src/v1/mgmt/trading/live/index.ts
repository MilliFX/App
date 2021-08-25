import { getMyAccounts } from "../../../../utils/api/MyFXBook";
import {
  APIGatewayEvent,
  APIGatewayProxyHandler,
  APIGatewayProxyResult,
} from "aws-lambda";
import middy from "middy";
import { myFXBookLoginMiddleware } from "../../../../middleware/MyFXBookLogin";

export const innerHandler = async (
  event: APIGatewayEvent
): Promise<APIGatewayProxyResult> => {
  if (event.headers["fxbook_session"]) {
    const session = event.headers["fxbook_session"];
    const { data: accountsData } = await getMyAccounts(session);

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(accountsData),
    };
  } else {
    // if log in to MyFXBook server failed
    return {
      statusCode: 403,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        error: "Missing session header, please check MyFXBookLogin middleware",
      }),
    };
  }
};

export const handler: APIGatewayProxyHandler = middy(innerHandler).use(
  myFXBookLoginMiddleware()
);
