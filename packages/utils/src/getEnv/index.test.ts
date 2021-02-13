import {Environment} from "./enums";
import {getEnv} from "./index";
import {HOSTNAME_DEVELOPMENT, HOSTNAME_LOCAL, HOSTNAME_PRODUCTION, HOSTNAME_STAGING} from "../utils/constants";

describe("@millifx/utils", () => {
  describe("getEnv()", () => {
    it(`should return ${Environment.Production} when hostName is ${HOSTNAME_PRODUCTION}`, () => {
      const env = getEnv(HOSTNAME_PRODUCTION);

      expect(env).toStrictEqual(Environment.Production);
    });
    it(`should return ${Environment.Staging} when hostName is ${HOSTNAME_STAGING}`, () => {
      const env = getEnv(HOSTNAME_STAGING);

      expect(env).toStrictEqual(Environment.Staging);
    });
    it(`should return ${Environment.Development} when hostName is ${HOSTNAME_DEVELOPMENT}`, () => {
      const env = getEnv(HOSTNAME_DEVELOPMENT);

      expect(env).toStrictEqual(Environment.Development);
    });
    it(`should return ${Environment.Development} when hostName is ${HOSTNAME_LOCAL}`, () => {
      const env = getEnv(HOSTNAME_LOCAL);

      expect(env).toStrictEqual(Environment.Development);
    });
    it(`should return ${Environment.Development} when unknown hostName is provided`, () => {
      // const consoleSpy = jest.spyOn(console, 'log'); // TODO: AP-101

      const randomHostName = "random-domain.com";
      const env = getEnv(randomHostName);

      // expect(consoleSpy).toHaveBeenCalledWith("Unknown hostname: " + randomHostName); // TODO: AP-101
      expect(env).toStrictEqual(Environment.Development);
    });
    it(`should return ${Environment.Development} when undefined hostName is provided`, () => {
      // const consoleSpy = jest.spyOn(console, 'log'); // TODO: AP-101

      const env = getEnv();

      // expect(consoleSpy).toHaveBeenCalledWith("Unknown hostname: " + undefined); // TODO: AP-101
      expect(env).toStrictEqual(Environment.Development);
    });
  });
});