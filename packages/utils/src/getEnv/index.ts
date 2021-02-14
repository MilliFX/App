import { Environment } from "./enums";
import {
  HOSTNAME_DEVELOPMENT,
  HOSTNAME_LOCAL,
  HOSTNAME_PRODUCTION,
  HOSTNAME_STAGING,
} from "../utils/constants";

const getEnv = (hostName?: string): Environment => {
  switch (hostName) {
    case HOSTNAME_PRODUCTION:
      return Environment.Production;
    case HOSTNAME_STAGING:
      return Environment.Staging;
    case HOSTNAME_DEVELOPMENT:
    case HOSTNAME_LOCAL:
      return Environment.Development;
    default:
      console.error("Unknown hostname: " + hostName);
      return Environment.Development;
  }
};

export { Environment, getEnv };
