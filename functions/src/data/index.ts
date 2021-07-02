import { APIGatewayEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from "aws-lambda";
import middy from "middy";
import { uuidValidationMiddleWare } from "../middleware/UUIDValidation";
import { domainValidationMiddleWare } from "../middleware/DomainValidation";
import { myFXBookLoginMiddleware } from "../middleware/MyFXBookLogin";
import { FxBookGetDaily, IFXBookGetDailyGainResponse } from "../utils/getFxBookDailyGain";
import { FXBOOK_TESTING_ACCOUNT_ID } from "../utils/const";
import { GenerateDuration } from "../utils/generateDuration";

export interface DataHandlerResponse {
  error: boolean;
  data: Array<object>,
  errorMessage?: string
}

export const dataHandler = async (
  event: APIGatewayEvent
): Promise<APIGatewayProxyResult> => {

  var startDate = event.queryStringParameters?.start;
  var endDate = event.queryStringParameters?.end;

  if(!startDate || !endDate){

    const duration = GenerateDuration();
    startDate = duration.startDate;
    endDate = duration.endDate;
  }

  var response: DataHandlerResponse = {
    error: false,
    data: []
  }


  if ( event.headers["fxbook_error"] === "false" && event.headers["fxbook_session"] ) {

    //fxBookAccountData = await FxBookGetAccount(event.headers["fxbook_session"]);

    var dailyGainData: IFXBookGetDailyGainResponse;

    dailyGainData = await FxBookGetDaily(event.headers["fxbook_session"], FXBOOK_TESTING_ACCOUNT_ID, startDate, endDate);

    if(dailyGainData.dailyGain.length > 0){

      response.data = dailyGainData.dailyGain;

    }else{
      response.error = true;
      response.errorMessage = "No data during this period";
    }

  }else{
    response.error = true;
    response.errorMessage = "Cannot login to the MyFXBook"; 
  }

  //console.log(event.headers);

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
