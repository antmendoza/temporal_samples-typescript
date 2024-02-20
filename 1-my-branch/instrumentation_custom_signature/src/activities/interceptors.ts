// @@@SNIPSTART typescript-activity-logging-interceptor
import { Context } from '@temporalio/activity';
import { ActivityInboundCallsInterceptor, ActivityExecuteInput, Next } from '@temporalio/worker';
import { Logger } from 'winston';

/** An Activity Context with an attached logger */
export interface ContextWithLogger extends Context {
  logger: Logger;
}

/** Get the current Activity context with an attached logger */
export function getContext(): ContextWithLogger {
  return Context.current() as ContextWithLogger;
}

/** Logs Activity executions and their duration */
export class ActivityInboundLogInterceptor implements ActivityInboundCallsInterceptor {
  public readonly logger: Logger;

  constructor(ctx: Context, logger: Logger) {
    this.logger = logger.child({
      activity: ctx.info,
    });

    // Set a logger instance on the current Activity Context to provide
    // contextual logging information to each log entry generated by the Activity.
    (ctx as ContextWithLogger).logger = this.logger;
  }

  async execute(input: ActivityExecuteInput, next: Next<ActivityInboundCallsInterceptor, 'execute'>): Promise<unknown> {

    console.log("executing.... ")

    let error: any = undefined;
    const startTime = process.hrtime.bigint();
    try {
      return await next(input);
    } catch (err: any) {
      error = err;
      throw err;
    } finally {
      const durationNanos = process.hrtime.bigint() - startTime;
      const durationMs = Number(durationNanos / 1_000_000n);
      if (error) {
        this.logger.error('activity failed', { error, durationMs });
      } else {
        this.logger.debug('activity completed', { durationMs });
      }
    }
  }
}
// @@@SNIPEND