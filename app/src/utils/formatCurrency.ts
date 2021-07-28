export const formatCurrency = (currency: number) => {
  let output: string;

  if (currency < 0) {
    const absCurrency = Math.abs(currency);
    output = "-$" + absCurrency.toString();
  } else if (currency > 0) {
    output = "+$" + currency.toString();
  } else {
    output = "$" + currency.toString();
  }

  return output;
};
