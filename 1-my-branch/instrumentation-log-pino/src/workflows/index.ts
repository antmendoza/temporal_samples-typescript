import {proxyActivities} from '@temporalio/workflow';
import type * as activities from '../activities';
import * as workflow from '@temporalio/workflow';
import pino from "pino";


const { greet } = proxyActivities<typeof activities>({
  startToCloseTimeout: '5 minutes',
});


const log = pino();

export async function logSampleWorkflow(): Promise<void> {
  const greeting = await greet('Temporal');
  log.info("imprimiendo from pino")
  workflow.log.error("")
}
