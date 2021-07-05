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

import { IChartDailyData } from "../utils/formatData";
import { FXBOOK_TESTING_ACCOUNT_ID } from "../utils/const";
import { GenerateDuration } from "../utils/generateDuration";
import { formatData } from "../utils/formatData";

export interface DataHandlerResponse {
  error: boolean;
  data: Array<IChartDailyData>;
  errorMessage?: string;
}

export const dataHandler = async (
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
  var response: DataHandlerResponse = {
    error: false,
    data: [],
  };

  // if successfully logged in to the MyFXBook with a session token
  if (
    event.headers["fxbook_error"] === "false" &&
    event.headers["fxbook_session"]
  ) {
    // initiate data-daily.json API response
    var dataDaily: IFXBookGetDataDailyResponse;

    // get daily gain data from MyFXBook server
    dataDaily = await FxBookGetDataDaily(
      event.headers["fxbook_session"],
      FXBOOK_TESTING_ACCOUNT_ID,
      startDate,
      endDate
    );

    // if has data during the given period
    if (dataDaily.dataDaily.length > 0) {
      // format data and assign to response.data
      response.data = formatData(dataDaily.dataDaily);
    } else {
      // if there is no data during the given period
      response.error = true;
      response.errorMessage = "No data during this period";
    }
  } else {
    // if log in to MyFXBook server failed
    response.error = true;
    response.errorMessage = "Cannot login to the MyFXBook";
  }

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(response),
  };
};

export const handler: APIGatewayProxyHandler = middy(dataHandler)
  .use(domainValidationMiddleWare())
  .use(uuidValidationMiddleWare())
  .use(myFXBookLoginMiddleware());
