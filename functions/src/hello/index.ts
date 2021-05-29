import { APIGatewayEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from "aws-lambda";
import middy from "middy"
import { myFXBookLoginMiddleware } from "../middleware/MyFXBookLogin"

export interface HelloResponse {
  message: string;
}

const helloHandler = async (
  event: APIGatewayEvent
): Promise<APIGatewayProxyResult> => {
  // your server-side functionality

  const msg = event.queryStringParameters?.msg;
  const response: HelloResponse = { message: "Hello World " + msg };
  console.log(event.headers);
  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(response),
  };
};

export const handler: APIGatewayProxyHandler = middy(helloHandler).use(myFXBookLoginMiddleware())