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
     *
     */
    const demoAccounts = accountsData.accounts.filter((account) => {
      return (
        account.demo && account.commission < 0 && !isArchivedAccount(account)
      );
    });
    console.log(demoAccounts);

    const demoAccountsFiltered: DemoAccount[]=[{account:'1',balance:2,equity:3}];

    demoAccounts.map((acc, index) => {
      demoAccountsFiltered.push({
        account: acc.accountId.toString(),
        balance: acc.balance,
        equity: acc.equity,
      });
    });
    

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      // body: JSON.stringify([...commissionIncome, ...tradingIncome]),
      body: JSON.stringify(demoAccountsFiltered.splice(1)),
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
