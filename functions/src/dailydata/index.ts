import {
  APIGatewayEvent,
  APIGatewayProxyResult,
  APIGatewayProxyHandler,
} from "aws-lambda";
import middy from "middy";
import { uuidValidationMiddleWare } from "../middleware/UUIDValidation";
import { domainValidationMiddleWare } from "../middleware/DomainValidation";
import { myFXBookLoginMiddleware } from "../middleware/MyFXBookLogin";
import {
  FxBookGetDataDaily,
  IFXBookGetDataDailyResponse,
} from "../utils/api/MyFXBook/index";
import { FXBOOK_TESTING_ACCOUNT_ID } from "../utils/const";
import { GenerateDuration } from "../utils/generateDuration";
import { FXBookDataDaily } from "../utils/api/MyFXBook/index";
import { bankersRound } from "bankers-round";
import { DailyData, DailyDataHandlerResponse } from "@millifx/utils";

export const DailyDataHandler = async (
  event: APIGatewayEvent
): Promise<APIGatewayProxyResult> => {
  // get start end date from query string
  var startDate = event.queryStringParameters?.start;
  var endDate = event.queryStringParameters?.end;

  // if there is not start end date, create today as start and today - 30 days as end
  if (!startDate || !endDate) {
    const duration = GenerateDuration(); // param number, defult 30
    startDate = duration.startDate;
    endDate = duration.endDate;
  }

  // initiate handler response
  var response: DailyDataHandlerResponse = {
    error: false,
    data: [],
  };

  var dataDaily: IFXBookGetDataDailyResponse;

  if (event.headers["fxbook_session"]) {
    dataDaily = await FxBookGetDataDaily(
      event.headers["fxbook_session"],
      FXBOOK_TESTING_ACCOUNT_ID,
      startDate,
      endDate
    );
    if (dataDaily.dataDaily.length > 0) {
      // format data and assign to response.data
      response.data = formatData(dataDaily.dataDaily);
    } else {
      // if there is no data during the given period
      response.error = true;
      response.errorMessage = "No data during this period";
    }
  } else {
    response.error = true;
    response.errorMessage = "Internal Error";
  }

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(response),
  };
};

export const formatData = (dataDaily: Array<Array<FXBookDataDaily>>) => {
  // break  Array<Array<FXBookDataDaily>> to Array<FXBookDataDaily>
  const dataDailyArray: Array<FXBookDataDaily> = dataDaily.map(
    (item) => item[0]
  );

  // initiate return variable
  var result: Array<DailyData> = [];

  // loop dataDailyArray and get date, balance, profit and equity
  for (let i = 0; i < dataDailyArray.length; i++) {
    // round equity to two decimals
    let roundedEquity = bankersRound(
      dataDailyArray[i].balance + dataDailyArray[i].floatingPL,
      2
    );

    let temp: DailyData = {
      date: dataDailyArray[i].date,
      balance: dataDailyArray[i].balance,
      profit: dataDailyArray[i].profit,
      equity: roundedEquity,
    };

    result.push(temp);
  }

  return result;
};

export const handler: APIGatewayProxyHandler = middy(DailyDataHandler)
  .use(domainValidationMiddleWare())
  .use(uuidValidationMiddleWare())
  .use(myFXBookLoginMiddleware());
