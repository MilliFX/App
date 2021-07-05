import { formatData } from "./formatData";

describe("formatData()", () => {
  it("should return", async () => {

    const testData = [
        [
            {
                "date": "02/01/2010",
                "balance": 1000.00,
                "pips": 83.30,
                "lots": 0.41,
                "floatingPL": -500.00,
                "profit": 100.00,
                "growthEquity": -4.15,
                "floatingPips": 1.00
            }
        ],
        [
            {
                "date": "03/01/2010",
                "balance": 1000.00,
                "pips": 83.30,
                "lots": 0.41,
                "floatingPL": -500.00,
                "profit": 100.00,
                "growthEquity": -4.15,
                "floatingPips": 1.00
            }
        ],
        [
            {
                "date": "04/01/2010",
                "balance": 1000.00,
                "pips": 83.30,
                "lots": 0.41,
                "floatingPL": -500.00,
                "profit": 100.00,
                "growthEquity": -4.15,
                "floatingPips": 1.00
            }
        ]
    ]

    const formattedData = formatData(testData);

    const anwser = [
        {
            "date": "02/01/2010",
            "balance": 1000,
            "profit": 100.00,
            "equity": 500.00

        },
        {
            "date": "03/01/2010",
            "balance": 1000,
            "profit": 100.00,
            "equity": 500.00

        },
        {
            "date": "04/01/2010",
            "balance": 1000,
            "profit": 100.00,
            "equity": 500.00

        }
    ]

    expect(formattedData).toStrictEqual(anwser);

  });
});
