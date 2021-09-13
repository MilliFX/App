import { formatHistoryData } from "./index";
import { formatDataTestInput, formatDataTestOutput } from "./testData";

// const mockHost = "http://localhost:3000";
// const mockUUID = "7e10d278-b178-11eb-8529-0242ac130003";
// describe("TransectionHandler()", () => {
//   it("should return", async () => {
//     // Arrange
//     // @ts-ignore

//     const event: APIGatewayProxyEvent = {
//       headers: {
//         host: mockHost,
//         "millifx-uuid": mockUUID,
//       }
//     };

//     const { statusCode, body } = await TransectionHandler(event);

//     expect(statusCode).toStrictEqual(200);
//   });
// });

describe("formatHistoryData()", () => {
  it("should return", async () => {
    const formattedData = formatHistoryData(formatDataTestInput);
    expect(formattedData).toStrictEqual(formatDataTestOutput);
  });
});
