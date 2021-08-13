export const displayCurrency = (currency: number) => {
  return `$ ${currency.toFixed(2)}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const upOrDown = (currency: number) => {
  return currency >= 0
    ? `+ ${currency.toFixed(2)} %`
    : `${currency.toFixed(2)} %`;
};
