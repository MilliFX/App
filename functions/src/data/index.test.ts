import { dataHandler } from "./index";
import { APIGatewayEvent, APIGatewayProxyResult, Context } from "aws-lambda";

const mockMsg = "Jack";
const mockHost = "localhost:8888";
const mockUUID = "7e10d278-b178-11eb-8529-0242ac130003";
describe("hello()", () => {
  it("should return", async () => {
    // Arrange
    // @ts-ignore

    const event: APIGatewayProxyEvent = {
      headers: {
        host: mockHost,
        "millifx-uuid": mockUUID,
      },
      queryStringParameters: {
        msg: mockMsg,
      },
    };

    // Act
    const { statusCode, headers, body } = await dataHandler(event);

    expect(statusCode).toStrictEqual(200);
    expect(headers).toStrictEqual({
      "Content-Type": "application/json",
    });
    expect(body).toStrictEqual('{"message":"Hello World Jack"}');

    // Assert
  });
});
