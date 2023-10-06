import { LoggerSinks, proxyActivities, proxySinks } from '@temporalio/workflow';
import type * as activities from './activities';

const { processRecords } = proxyActivities<typeof activities>({
  startToCloseTimeout: '30m',
  heartbeatTimeout: '2s',
});
const { defaultWorkerLogger: logger } = proxySinks<LoggerSinks>();

export async function processBatch(): Promise<number> {
  const result = await processRecords();
  logger.info(`Num records processed: ${result}`, {});
  return result;
}
