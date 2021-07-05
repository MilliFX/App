import { formatData } from "./formatData";

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
