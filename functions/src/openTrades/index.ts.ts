import { openTradesHandler } from "./index";

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
      };
  
      // Act
      const { statusCode } = await openTradesHandler(event);
  
      expect(statusCode).toStrictEqual(200);

      // Assert
    });
  });