import { getMyAccounts, getHistory } from "../../../../utils/api/MyFXBook";
import {
  APIGatewayEvent,
  APIGatewayProxyHandler,
  APIGatewayProxyResult,
} from "aws-lambda";
import middy from "middy";
import { myFXBookLoginMiddleware } from "../../../../middleware/MyFXBookLogin";
import { isArchivedAccount, isCommissionAccount } from "../../utils";
import { DemoAccount, Income } from "./types";
import bankersRound from "bankers-round";

export const innerHandler = async (
  event: APIGatewayEvent
): Promise<APIGatewayProxyResult> => {
  if (event.headers["fxbook_session"]) {
    const session = event.headers["fxbook_session"];
    const { data: accountsData } = await getMyAccounts(session);

    /**
     * Demo Accounts
     */
    const demoAccounts = accountsData.accounts.filter((account) => {
      return (
        account.demo && account.commission < 0 && !isArchivedAccount(account)
      );
    });

    const demoAccountsFiltered: DemoAccount[] = demoAccounts.map((acc) => {
      return {
        account: acc.accountId,
        name: acc.name,
        description: acc.description,
        deposits: acc.deposits,
        withdrawals: acc.withdrawals,
        gain: acc.gain,
        absGain: acc.absGain,
        balance: acc.balance,
        equity: acc.equity,
        monthly: acc.monthly,
        drawdown: acc.drawdown,
        currency: acc.currency,
        profitFactor: acc.profitFactor,
        creationDate: acc.creationDate,
        lastUpdateDate: acc.lastUpdateDate,
      };
    });

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(demoAccountsFiltered),
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
