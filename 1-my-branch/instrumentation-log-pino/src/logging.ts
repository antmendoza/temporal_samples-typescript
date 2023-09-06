
import pino from "pino";

export interface LoggerOptions {
  isProduction: boolean;
  logFilePath: string;
}

const logger = pino()

/** Turns a given timestamp or current Date to an ISO date string */
function getDateStr(timestamp?: number): string {
  return timestamp ? new Date(timestamp).toJSON() : new Date().toJSON();
}

/** Create a winston logger from given options */
export function createLogger(): pino.Logger {
  return logger;
}
