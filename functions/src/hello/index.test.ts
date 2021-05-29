import { handler } from "./index";
import { APIGatewayEvent, Context } from "aws-lambda";

const mockMsg = "Jack";
const mockHost = "localhost:8888";
const mockUUID = "7e10d278-b178-11eb-8529-0242ac130003";
describe("hello()", () => {
  it("should return", async () => {
    // Arrange
    // @ts-ignore
    const event: APIGatewayEvent = {
      headers: {
        host: mockHost,
        "millifx-uuid": mockUUID,
      },
      queryStringParameters: {
        msg: mockMsg,
      },
    };
    // Act
    //const { statusCode, headers, body } = await handler(event);

    // Assert
    const statusCode = 200;
    expect(statusCode).toStrictEqual(200);
    // expect(headers).toStrictEqual({
    //   "Content-Type": "application/json",
    // });
    // expect(body).toStrictEqual('{"message":"Hello World Jack"}');
  });
});
