import {
  APIGatewayEvent,
  APIGatewayProxyHandler,
  APIGatewayProxyResult,
} from "aws-lambda";
import middy from "middy";
import { headerValidationMiddleWare } from "../middleware/HeaderValidation";

export interface HelloResponse {
  message: string;
}

const helloHandler = async (
  event: APIGatewayEvent
): Promise<APIGatewayProxyResult> => {
  // your server-side functionality

  //Initial response
  var response: HelloResponse = { message: "Hello" };
  const msg = event.queryStringParameters?.msg;
  response.message = "Hello World " + msg;

  //response:
  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(response),
  };
};

export const handler: APIGatewayProxyHandler = middy(helloHandler).use(
  headerValidationMiddleWare()
);
