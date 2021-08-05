export const formatDataTestInput = [
  {
    openTime: "02/05/2021 16:00",
    closeTime: "02/05/2021 16:43",
    symbol: "EURNZD",
    action: "SELL",
    sizing: {
      type: "lots",
      value: 0.01,
    },
    openPrice: 1.67563,
    closePrice: 1.67218,
    tp: 0,
    sl: 0,
    pips: 34.5,
    profit: 3.15,
    comment: "Grid_King_B",
    interest: 0,
    commission: -0.09,
  },
  {
    openTime: "02/04/2021 13:00",
    closeTime: "02/05/2021 15:47",
    symbol: "EURUSD",
    action: "BUY",
    sizing: {
      type: "lots",
      value: 0.01,
    },
    openPrice: 1.19877,
    closePrice: 1.20183,
    tp: 0,
    sl: 0,
    pips: 30.6,
    profit: 3.86,
    comment: "Grid_King_B",
    interest: -0.06,
    commission: -0.09,
  },
  {
    openTime: "02/05/2021 15:00",
    closeTime: "02/05/2021 15:40",
    symbol: "EURNZD",
    action: "SELL",
    sizing: {
      type: "lots",
      value: 0.01,
    },
    openPrice: 1.67741,
    closePrice: 1.67399,
    tp: 0,
    sl: 0,
    pips: 34.2,
    profit: 3.13,
    comment: "Grid_King_B",
    interest: 0,
    commission: -0.09,
  },
  {
    openTime: "02/05/2021 14:00",
    closeTime: "02/05/2021 15:36",
    symbol: "XAUUSD",
    action: "BUY",
    sizing: {
      type: "lots",
      value: 0.03,
    },
    openPrice: 1803.18,
    closePrice: 1806.41,
    tp: 0,
    sl: 0,
    pips: 323,
    profit: 12.43,
    comment: "Grid_King_A",
    interest: 0,
    commission: -0.27,
  },
];

export const formatDataTestOutput = [
  {
    date: "Fri, 05 February 2021",
    transections: [
      {
        action: "SELL",
        fromCurrency: "EUR",
        lots: 0.01,
        profit: 3.15,
        toCurrency: "NZD",
      },
      {
        action: "BUY",
        fromCurrency: "EUR",
        lots: 0.01,
        profit: 3.86,
        toCurrency: "USD",
      },
      {
        action: "SELL",
        fromCurrency: "EUR",
        lots: 0.01,
        profit: 3.13,
        toCurrency: "NZD",
      },
      {
        action: "BUY",
        fromCurrency: "XAU",
        lots: 0.03,
        profit: 12.43,
        toCurrency: "USD",
      },
    ],
  },
];
