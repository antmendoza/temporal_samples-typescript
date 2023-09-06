// @@@SNIPSTART typescript-activity-use-injected-logger
import { getContext } from './interceptors';
import {ApplicationFailure} from "@temporalio/workflow";

export async function greet(name: string): Promise<string> {
  const { logger } = getContext();
  logger.info('Log from activity', { name });
  return `Hello, ${name}!`;
}
// @@@SNIPEND
