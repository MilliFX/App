import { ChartHandler, formatData } from "./index";

const mockHost = "localhost:8888";
const mockUUID = "7e10d278-b178-11eb-8529-0242ac130003";
describe("ChartHandler()", () => {
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

    const { statusCode } = await ChartHandler(event);

    expect(statusCode).toStrictEqual(200);
  });
});

describe("formatData()", () => {
  it("should return", async () => {
    const testData = [
      [
        {
          date: "02/01/2010",
          balance: 1000.0,
          pips: 83.3,
          lots: 0.41,
          floatingPL: -500.0,
          profit: 100.0,
          growthEquity: -4.15,
          floatingPips: 1.0,
        },
      ],
      [
        {
          date: "03/01/2010",
          balance: 1000.0,
          pips: 83.3,
          lots: 0.41,
          floatingPL: -500.0,
          profit: 100.0,
          growthEquity: -4.15,
          floatingPips: 1.0,
        },
      ],
      [
        {
          date: "04/01/2010",
          balance: 1000.0,
          pips: 83.3,
          lots: 0.41,
          floatingPL: -500.0,
          profit: 100.0,
          growthEquity: -4.15,
          floatingPips: 1.0,
        },
      ],
    ];

    const formattedData = formatData(testData);

    const anwser = [
      {
        date: "02/01/2010",
        balance: 1000,
        profit: 100.0,
        equity: 500.0,
      },
      {
        date: "03/01/2010",
        balance: 1000,
        profit: 100.0,
        equity: 500.0,
      },
      {
        date: "04/01/2010",
        balance: 1000,
        profit: 100.0,
        equity: 500.0,
      },
    ];

    expect(formattedData).toStrictEqual(anwser);
  });
});
