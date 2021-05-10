import { APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";

export interface HelloResponse {
  message: string;
}

export const handler = async (
  event: APIGatewayEvent
): Promise<APIGatewayProxyResult> => {
  // your server-side functionality

  const msg = event.queryStringParameters?.msg;
  const response: HelloResponse = { message: "Hello World " + msg };

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(response),
  };
};