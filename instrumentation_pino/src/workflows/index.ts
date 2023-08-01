import { LoggerSinks, proxyActivities, proxySinks, Sinks } from '@temporalio/workflow';
import type * as activities from '../activities';

export interface MyLoggerSinks extends Sinks {
  defaultWorkerLogger: {
    trace(attrs: Record<string, unknown>, message: string): void;
    debug(attrs: Record<string, unknown>, message: string): void;
    info(attrs: Record<string, unknown>, message: string): void;
    warn(attrs: Record<string, unknown>, message: string): void;
    error(attrs: Record<string, unknown>, message: string): void;
  };
}

const { defaultWorkerLogger: logger } = proxySinks<MyLoggerSinks>();

const { greet } = proxyActivities<typeof activities>({
  startToCloseTimeout: '5 minutes',
});

export async function logSampleWorkflow(): Promise<void> {
  const greeting = await greet('Temporal');
  logger.error({ greeting }, 'Greeted');
  logger.info({ greeting }, 'Greeted');
}
