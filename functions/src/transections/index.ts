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
  IFXBookGetHistoryResponse,
  IFXBookHistoryDaily,
} from "../utils/api/MyFXBook/getFxBookHistory";
import moment from "moment";

interface ITransectionHandlerResponse {
  error: boolean;
  data: {
    history: IFormattedDailyHistory[];
    dailyGain: number;
  };
  errorMessage?: string;
}

interface IFormattedDailyHistory {
  date: string;
  transections: ISingleTransection[];
}

interface ISingleTransection {
  action: string;
  fromCurrency: string;
  toCurrency: string;
  lots: number;
  profit: number;
}
export const transectionHandler = async (
  event: APIGatewayEvent
): Promise<APIGatewayProxyResult> => {
  // initiate handler response
  var response: ITransectionHandlerResponse = {
    error: false,
    data: {
      history: [],
      dailyGain: 0,
    },
  };

  // if successfully logged in to the MyFXBook with a session token
  if (
    event.headers["fxbook_error"] === "false" &&
    event.headers["fxbook_session"]
  ) {
    var history: IFXBookGetHistoryResponse;

    // get daily gain data from MyFXBook server
    history = await FxBookGetHistory(
      event.headers["fxbook_session"],
      FXBOOK_TESTING_ACCOUNT_ID
    );

    // if has data during the given period
    if (history.history.length > 0) {
      // format data and assign to response.data
      response.data.history = formatHistoryData(history.history);
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

const formatHistoryData = (data: IFXBookHistoryDaily[]) => {
  var output: IFormattedDailyHistory[] = [];

  for (let i = 0; i < data.length; i++) {
    var time = data[i].closeTime.split(" ")[0];
    time = moment(time, "MM/DD/YYYY").format("ddd, DD MMMM YYYY");
    data[i].closeTime = time;

    if (output.length === 0) {
      let temp: IFormattedDailyHistory = {
        date: data[i].closeTime,
        transections: [],
      };
      let tempTransection: ISingleTransection = {
        action: data[i].action,
        fromCurrency: data[i].symbol.substring(0, 3),
        toCurrency: data[i].symbol.substring(3, 6),
        lots: data[i].sizing.value,
        profit: data[i].profit,
      };
      temp.transections.push(tempTransection);
      output.push(temp);
    } else {
      for (let j = 0; j < output.length; j++) {
        if (data[i].closeTime !== output[j].date) {
          let temp: IFormattedDailyHistory = {
            date: data[i].closeTime,
            transections: [],
          };

          let tempTransection: ISingleTransection = {
            action: data[i].action,
            fromCurrency: data[i].symbol.substring(0, 3),
            toCurrency: data[i].symbol.substring(3, 6),
            lots: data[i].sizing.value,
            profit: data[i].profit,
          };
          temp.transections.push(tempTransection);
          output.push(temp);
        } else {
          let tempTransection: ISingleTransection = {
            action: data[i].action,
            fromCurrency: data[i].symbol.substring(0, 3),
            toCurrency: data[i].symbol.substring(3, 6),
            lots: data[i].sizing.value,
            profit: data[i].profit,
          };

          output[j].transections.push(tempTransection);
        }
      }
    }
  }

  return output;
};

export const handler: APIGatewayProxyHandler = middy(transectionHandler)
  .use(domainValidationMiddleWare())
  .use(uuidValidationMiddleWare())
  .use(myFXBookLoginMiddleware());
