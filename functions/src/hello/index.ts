import { APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";
import { headerValidation } from "../util/headerValidation";

export interface HelloResponse {
  message: string;
}

export const handler = async (
  event: APIGatewayEvent
): Promise<APIGatewayProxyResult> => {
  // your server-side functionality

  //console.log(event.headers);

  //Initial status code of 200
  var statusCode: number = 200;

  //Initial response
  var response: HelloResponse = { message: "" };

  if (headerValidation(event.headers)) {
    //If specific header valid, prepare response
    const msg = event.queryStringParameters?.msg;
    response.message = "Hello World " + msg;
  } else {
    //If specific header invalid, change status code to 401 and prepare response
    statusCode = 401;
    response.message = "Unauthorized request";
  }

  //response:
  return {
    statusCode: statusCode,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "https://app-dev.millifx.com",
    },
    body: JSON.stringify(response),
  };
};
