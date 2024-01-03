import { executeChild, proxyActivities, workflowInfo } from '@temporalio/workflow';
import type * as activities from './activities';

export default async function (...args: unknown[]): Promise<unknown> {
  console.log('existing....  ', args);

  switch (workflowInfo().workflowType) {
    case 'workflow-function-with-dash':
      return {
        handler: 'workflow-function-with-dash',
        args,
      };

    default:
      console.log('default....  ', args);
      return {
        handler: 'default',
        args,
      };
  }
}

export interface WorkflowTypeAndArgs {
  handler: string;
  workflowType?: string;
  args: unknown[];
}
