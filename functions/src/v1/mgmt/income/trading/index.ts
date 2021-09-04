import { getMyAccounts } from "../../../../utils/api/MyFXBook";
import {
  APIGatewayEvent,
  APIGatewayProxyHandler,
  APIGatewayProxyResult,
} from "aws-lambda";
import middy from "middy";
import { myFXBookLoginMiddleware } from "../../../../middleware/MyFXBookLogin";
import { isArchivedAccount, isCommissionAccount } from "../../utils";
import bankersRound from "bankers-round";

export const innerHandler = async (
  event: APIGatewayEvent
): Promise<APIGatewayProxyResult> => {
  if (event.headers["fxbook_session"]) {
    const session = event.headers["fxbook_session"];
    const { data: accountsData } = await getMyAccounts(session);

    /**
     * Trading Accounts
     *
     * Monthly Income = Deposits & Monthly
     */
    const tradingAccounts = accountsData.accounts.filter((account) => {
      return (
        !account.demo &&
        !isArchivedAccount(account) &&
        !isCommissionAccount(account)
      );
    });
    const incomes = tradingAccounts.map((account) => {
      const estimatedMonthlyIncome = (account.deposits * account.monthly) / 100;
      return {
        accountName: account.name,
        monthly: bankersRound(estimatedMonthlyIncome),
      };
    });

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
