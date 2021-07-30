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

export interface ChartHandlerResponse {
  error: boolean;
  data: Array<IChartDailyData>;
  errorMessage?: string;
}

export const ChartHandler = async (
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
  var response: ChartHandlerResponse = {
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

export const handler: APIGatewayProxyHandler = middy(ChartHandler)
  .use(domainValidationMiddleWare())
  .use(uuidValidationMiddleWare())
  .use(myFXBookLoginMiddleware());
