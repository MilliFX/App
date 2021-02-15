import { handler } from "./index";
import { APIGatewayEvent } from "aws-lambda";

const mockMsg = "Jack";
describe("hello()", () => {
  it("should return", async () => {
    // Arrange
    // @ts-ignore
    const event: APIGatewayEvent = {
      queryStringParameters: {
        msg: mockMsg,
      },
    };

    // Act
    const { statusCode, headers, body } = await handler(event);

    // Assert
    expect(statusCode).toStrictEqual(200);
    expect(headers).toStrictEqual({
      "Content-Type": "application/json",
    });
    expect(body).toStrictEqual('{"message":"Hello World Jack"}');
  });
});
