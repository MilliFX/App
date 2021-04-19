//Specific Header and Domain control
//Formate
//millifx-uuid: millifx-uuid-14232132321
export const headerValidation = (headers: any) => {
  const whiteList: Array<string> = [
    "https://app-dev.millifx.com",
    "https://app-stg.millifx.com",
    "https://app.millifx.com",
    "http://app.millifx.local",
    "localhost:8888",
  ];

  if (headers["millifx-uuid"] && whiteList.includes(headers["host"])) {
    return true;
  } else {
    return false;
  }
};
