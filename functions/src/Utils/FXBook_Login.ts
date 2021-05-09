import * as https from "https";
import * as querystring from "querystring";

export interface IFXBookResponse {
  error: boolean;
  message: string;
  session: string;
}

export const FxBookLogin = (): Promise<IFXBookResponse> => {
  const fxBookLoginData: string = querystring.stringify({
    email: process.env.FXBOOK_EMAIL,
    password: process.env.FXBOOK_PASSWORD,
  });

  const options = {
    host: process.env.FXBOOK_URL,
    path: "/api/login.json",
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Content-Length": Buffer.byteLength(fxBookLoginData),
    },
  };
  return new Promise((resolve, reject) => {
    var req = https.request(options, (res) => {
      res.setEncoding("utf8");

      let result: IFXBookResponse = {
        error: true,
        message: "Request error",
        session: "",
      };

      res.on("data", (chunk: string) => {
        let chunk_obj = JSON.parse(chunk);
        result.error = chunk_obj.error;
        result.message = chunk_obj.message;
        result.message = chunk_obj.session;
      });

      res.on("end", () => {
        resolve(result);
      });

      res.on("error", (error: Error) => {
        reject(error);
      });
    });
    req.write(fxBookLoginData);
    req.end();
  });
};
