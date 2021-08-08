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
import {
  FxBookGetHistory,
  FXBookGetHistoryResponse,
  FXBookHistoryDaily,
} from "../utils/api/MyFXBook/getFxBookHistory";
import moment from "moment";
import {
  TransectionHandlerResponse,
  FormattedDailyHistory,
  SingleTransection,
} from "@millifx/utils";

export const TransectionHandler = async (
  event: APIGatewayEvent
): Promise<APIGatewayProxyResult> => {
  // initiate handler response
  let response: TransectionHandlerResponse = {
    error: false,
    data: {
      history: [],
      dailyGain: 0,
    },
  };

  if (event.headers["fxbook_session"]) {
    let history: FXBookGetHistoryResponse;

    history = await FxBookGetHistory(
      event.headers["fxbook_session"],
      FXBOOK_TESTING_ACCOUNT_ID
    );

    // if has data during the given period
    if (history.history.length > 0) {
      response.data.history = formatHistoryData(history.history);
    } else {
      // if there is no data during the given period
      response.error = true;
      response.errorMessage = "No data during this period";
    }
  } else {
    // if log in to MyFXBook server failed
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

export const formatHistoryData = (data: FXBookHistoryDaily[]) => {
  let output: FormattedDailyHistory[] = [];

  for (let i = 0; i < data.length; i++) {
    let time = data[i].closeTime.split(" ")[0];
    time = moment(time, "MM/DD/YYYY").format("ddd, DD MMMM YYYY");
    data[i].closeTime = time;

    if (output.length === 0) {
      let temp: FormattedDailyHistory = {
        date: data[i].closeTime,
        transections: [],
      };
      const tempTransection = createTransection(data[i]);
      temp.transections.push(tempTransection);
      output.push(temp);
    } else {
      let isMatched = false;
      for (let j = 0; j < output.length; j++) {
        if (data[i].closeTime === output[j].date) {
          const tempTransection: SingleTransection = createTransection(data[i]);
          output[j].transections.push(tempTransection);
          isMatched = true;
          break;
        }
      }
      if (!isMatched) {
        let temp: FormattedDailyHistory = {
          date: data[i].closeTime,
          transections: [],
        };
        const tempTransection = createTransection(data[i]);
        temp.transections.push(tempTransection);
        output.push(temp);
      }
    }
  }

  let sortedOutput = output.sort(
    (a: FormattedDailyHistory, b: FormattedDailyHistory) =>
      moment(b.date, "ddd, DD MMMM YYYY").diff(a.date)
  );
  return sortedOutput;
};

const createTransection = (data: FXBookHistoryDaily): SingleTransection => {
  return {
    action: data.action,
    fromCurrency: data.symbol.substring(0, 3),
    toCurrency: data.symbol.substring(3, 6),
    lots: data.sizing.value,
    profit: data.profit,
  };
};

export const handler: APIGatewayProxyHandler = middy(TransectionHandler)
  .use(domainValidationMiddleWare())
  .use(uuidValidationMiddleWare())
  .use(myFXBookLoginMiddleware());
