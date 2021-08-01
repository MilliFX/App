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
    IFXBookGetOpenTradesResponse,
    FxBookGetOpenTrades,
    IFXBookSingleDailyTrade 
  } from "../utils/api/MyFXBook/index";
  import { FXBOOK_TESTING_ACCOUNT_ID } from "../utils/const";

  interface IOpenTradeHandlerResponse {
    error: boolean;
    data: {
      openTrades: IFormattedSingleOpenTrade[];
      runningPL:number;
    };
    errorMessage?: string;
  }
  
  interface IFormattedSingleOpenTrade {
    action: string;
    fromCurrency: string;
    toCurrency: string;
    lots: number;
    profit: number;
  }
  export const openTradesHandler = async (
    event: APIGatewayEvent
  ): Promise<APIGatewayProxyResult> => {

    let response: IOpenTradeHandlerResponse = {
        error: false,
        data: {
          openTrades: [],
          runningPL:0
        },
      };

    if (event.headers["fxbook_session"]) {
        let openTrades: IFXBookGetOpenTradesResponse;

        openTrades = await FxBookGetOpenTrades(
          event.headers["fxbook_session"],
          FXBOOK_TESTING_ACCOUNT_ID
        );
          if (openTrades.openTrades.length > 0) {
            response.data.openTrades = openTrades.openTrades.map((openTrade)=>transformSingleOpenTrade(openTrade));
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
}

const transformSingleOpenTrade = (data:IFXBookSingleDailyTrade):IFormattedSingleOpenTrade => {
  return {
    action: data.action,
    fromCurrency: data.symbol.substring(0, 3),
    toCurrency: data.symbol.substring(3, 6),
    lots: parseFloat(data.sizing.value),
    profit: data.profit,
  }
}


export const handler: APIGatewayProxyHandler = middy(openTradesHandler)
  .use(domainValidationMiddleWare())
  .use(uuidValidationMiddleWare())
  .use(myFXBookLoginMiddleware());