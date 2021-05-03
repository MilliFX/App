import {
  APIGatewayEvent,
  APIGatewayProxyHandler,
  APIGatewayProxyResult,
} from "aws-lambda";
import middy from "middy";
import { uuidValidationMiddleWare } from "../middleware/UUIDValidation";
import { domainValidationMiddleWare } from "../middleware/DomainValidation";

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

export const handler: APIGatewayProxyHandler = middy(helloHandler)
  .use(uuidValidationMiddleWare())
  .use(domainValidationMiddleWare());
