import { DailyDataHandler, formatData } from "./index";
import { formatDataTestInput, formatDataTestOutput } from "./testData";

const mockHost = "localhost:8888";
const mockUUID = "7e10d278-b178-11eb-8529-0242ac130003";
describe("DailyDataHandler()", () => {
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

    const { statusCode } = await DailyDataHandler(event);

    expect(statusCode).toStrictEqual(200);
  });
});

describe("formatData()", () => {
  it("should return", async () => {
    const formattedData = formatData(formatDataTestInput);

    expect(formattedData).toStrictEqual(formatDataTestOutput);
  });
});
