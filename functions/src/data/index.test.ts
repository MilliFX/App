import { dataHandler } from "./index";

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
        start: "2021-01-01",
        end: "2021-06-23",
      },
    };

    // Act
    const { statusCode } = await dataHandler(event);

    expect(statusCode).toStrictEqual(200);

    // Assert
  });
});
