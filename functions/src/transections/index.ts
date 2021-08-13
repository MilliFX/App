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
import moment from "moment";
import {
  TransectionHandlerResponse,
  FormattedDailyHistory,
  SingleTransection,
} from "@millifx/utils";
import { getHistory, History } from "../utils/api/MyFXBook/getHistory";

export const TransectionHandler = async (
  event: APIGatewayEvent
): Promise<APIGatewayProxyResult> => {

  if (event.headers["fxbook_session"]) {
    const { data } = await getHistory(
      event.headers["fxbook_session"],
      FXBOOK_TESTING_ACCOUNT_ID
    );

    const resHistory = formatHistoryData(data.history);

    const res: TransectionHandlerResponse = {
      error: false,
      data: {
        history: resHistory,
        dailyGain: resHistory[0].transections[0].profit
      }
    }
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(res),
    };
  } else {
    const res: TransectionHandlerResponse = {
      error: true,
      data: null,
      errorMessage: "Internal Error"
    }
    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(res),
    };
  }
};

export const formatHistoryData = (data: History[]) => {
  const output: FormattedDailyHistory[] = [];

  for (let i = 0; i < data.length; i++) {
    let time = data[i].closeTime.split(" ")[0];
    time = moment(time, "MM/DD/YYYY").format("ddd, DD MMMM YYYY");
    data[i].closeTime = time;

    if (output.length === 0) {
      const temp: FormattedDailyHistory = {
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
        const temp: FormattedDailyHistory = {
          date: data[i].closeTime,
          transections: [],
        };
        const tempTransection = createTransection(data[i]);
        temp.transections.push(tempTransection);
        output.push(temp);
      }
    }
  }

  const sortedOutput = output.sort(
    (a: FormattedDailyHistory, b: FormattedDailyHistory) =>
      moment(b.date, "ddd, DD MMMM YYYY").diff(a.date)
  );
  return sortedOutput;
};

const createTransection = (data: History): SingleTransection => {
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
