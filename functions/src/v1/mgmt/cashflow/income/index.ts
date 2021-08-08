import { getMyAccounts, getDailyGain } from "../../../../utils/api/MyFXBook";
import {
  APIGatewayEvent,
  APIGatewayProxyHandler,
  APIGatewayProxyResult,
} from "aws-lambda";
import middy from "middy";
import { myFXBookLoginMiddleware } from "../../../../middleware/MyFXBookLogin";
import { isArchivedAccount, isCommissionAccount } from "../../utils";
import { Income } from "./types";
import bankersRound from "bankers-round";

export const innerHandler = async (
  event: APIGatewayEvent
): Promise<APIGatewayProxyResult> => {
  if (event.headers["fxbook_session"]) {
    const session = event.headers["fxbook_session"];
    const { data: accountsData } = await getMyAccounts(session);

    const activeAccounts = accountsData.accounts.filter((account) => {
      return (
        !account.demo &&
        !isArchivedAccount(account) &&
        !isCommissionAccount(account)
      );
    });

    const now = new Date();
    const endDate = new Date(now.getFullYear(), now.getMonth(), 0);
    const startDate = new Date(endDate.getFullYear(), endDate.getMonth(), 1);
    const endDateString = `${endDate.getFullYear()}-${endDate.getMonth()}-${endDate.getDate()}`;
    const startDateString = `${startDate.getFullYear()}-${startDate.getMonth()}-${startDate.getDate()}`;

    const incomesPromises = activeAccounts.map(
      async (account): Promise<Income> => {
        const { data: dailyGainData } = await getDailyGain(
          session,
          account.id,
          startDateString,
          endDateString
        );

        let incomeFromLastMonth = 0;
        for (let i = 0; i < dailyGainData.dailyGain.length; i++) {
          const dailyGain = dailyGainData.dailyGain[i][0];
          incomeFromLastMonth += dailyGain.profit;
        }

        return {
          accountName: account.name,
          monthly: bankersRound(incomeFromLastMonth),
        };
      }
    );

    const incomes = await Promise.all(incomesPromises);

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(incomes),
    };
  } else {
    // if log in to MyFXBook server failed
    return {
      statusCode: 403,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        error: "Missing session header, please check MyFXBookLogin middleware",
      }),
    };
  }
};

export const handler: APIGatewayProxyHandler = middy(innerHandler).use(
  myFXBookLoginMiddleware()
);
