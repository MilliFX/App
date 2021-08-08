import {
  APIGatewayEvent,
  APIGatewayProxyResult,
  APIGatewayProxyHandler,
} from "aws-lambda";
import middy from "middy";
import { uuidValidationMiddleWare } from "../middleware/UUIDValidation";
import { domainValidationMiddleWare } from "../middleware/DomainValidation";
import { myFXBookLoginMiddleware } from "../middleware/MyFXBookLogin";
import { FXBOOK_TESTING_ACCOUNT_ID } from "../utils/const";
import { GenerateDuration } from "../utils/generateDuration";
import { bankersRound } from "bankers-round";
import { DailyData, DailyDataHandlerResponse } from "@millifx/utils";
import {
  DataDaily,
  GetDataDailyResponse,
} from "../utils/api/MyFXBook/getDataDaily/types";
import { getDataDaily } from "../utils/api/MyFXBook";

export const DailyDataHandler = async (
  event: APIGatewayEvent
): Promise<APIGatewayProxyResult> => {
  // get start end date from query string
  let startDate = event.queryStringParameters?.start;
  let endDate = event.queryStringParameters?.end;

  // if there is not start end date, create today as start and today - 30 days as end
  if (!startDate || !endDate) {
    const duration = GenerateDuration(); // param number, defult 30
    startDate = duration.startDate;
    endDate = duration.endDate;
  }

  // initiate handler response
  const response: DailyDataHandlerResponse = {
    error: false,
    data: [],
  };

  if (event.headers["fxbook_session"]) {
    const { data } = await getDataDaily(
      event.headers["fxbook_session"],
      FXBOOK_TESTING_ACCOUNT_ID,
      startDate,
      endDate
    );
    if (data.dataDaily.length > 0) {
      // format data and assign to response.data
      response.data = formatData(data.dataDaily);
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

export const formatData = (dataDaily: Array<Array<DataDaily>>) => {
  // break  Array<Array<FXBookDataDaily>> to Array<FXBookDataDaily>
  const dataDailyArray: Array<DataDaily> = dataDaily.map((item) => item[0]);

  // initiate return variable
  const result: Array<DailyData> = [];

  // loop dataDailyArray and get date, balance, profit and equity
  for (let i = 0; i < dataDailyArray.length; i++) {
    // round equity to two decimals
    const roundedEquity = bankersRound(
      dataDailyArray[i].balance + dataDailyArray[i].floatingPL,
      2
    );

    const temp: DailyData = {
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
