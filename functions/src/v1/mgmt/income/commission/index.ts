import { getMyAccounts, getHistory } from "../../../../utils/api/MyFXBook";
import {
  APIGatewayEvent,
  APIGatewayProxyHandler,
  APIGatewayProxyResult,
} from "aws-lambda";
import middy from "middy";
import { myFXBookLoginMiddleware } from "../../../../middleware/MyFXBookLogin";
import { isArchivedAccount, isCommissionAccount } from "../../utils";
import { Income } from "../types";
import bankersRound from "bankers-round";

export const innerHandler = async (
  event: APIGatewayEvent
): Promise<APIGatewayProxyResult> => {
  if (event.headers["fxbook_session"]) {
    const session = event.headers["fxbook_session"];
    const { data: accountsData } = await getMyAccounts(session);
    const now = new Date();
    const endDate = new Date(now.getFullYear(), now.getMonth(), 0);
    const startDate = new Date(endDate.getFullYear(), endDate.getMonth(), 1);

    /**
     * Commission Accounts
     *
     * Monthly Income = getHistory & sum of past month
     */
    const commissionAccounts = accountsData.accounts.filter((account) => {
      return (
        !account.demo &&
        !isArchivedAccount(account) &&
        isCommissionAccount(account)
      );
    });

    const incomes = await Promise.all(
      commissionAccounts.map(
        async (account): Promise<Income> => {
          const { data: historyData } = await getHistory(session, account.id);

          let incomeFromLastMonth = 0;
          for (let i = 0; i < historyData.history.length; i++) {
            const history = historyData.history[i];
            const historyDate = new Date(history.closeTime);
            if (
              historyDate < endDate &&
              historyDate > startDate &&
              history.profit >= 0
            ) {
              incomeFromLastMonth += history.profit;
            }
          }

          return {
            accountName: account.name,
            monthly: bankersRound(incomeFromLastMonth),
          };
        }
      )
    );

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([...incomes]),
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
