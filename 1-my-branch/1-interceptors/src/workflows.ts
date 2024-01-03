import { executeChild, proxyActivities, workflowInfo } from '@temporalio/workflow';
import type * as activities from './activities';

export default async function (...args: unknown[]): Promise<WorkflowTypeAndArgs> {
  console.log('existing....  ', args);

  switch (workflowInfo().workflowType) {
    case 'workflow-function-with-dash':
      return {
        handler: 'workflow-function-with-dash',
        args,
      };
    default:
      return {
        handler: 'existing',
        args,
      };
  }
}

export async function httpWorkflow(): Promise<string> {
  await executeChild(childWorkflow, {
    args: [],
    taskQueue: 'other',
    // workflowId, // add business-meaningful workflow id here
    // // regular workflow options apply here, with two additions (defaults shown):
    // cancellationType: ChildWorkflowCancellationType.WAIT_CANCELLATION_COMPLETED,
    // parentClosePolicy: ParentClosePolicy.PARENT_CLOSE_POLICY_TERMINATE
  });
  return `The answer is `;
}

export async function childWorkflow(): Promise<string> {
  console.log('childWorkflow > ');
  return `Child workflow`;
}

export async function child_Workflow(): Promise<string> {
  console.log('child_Workflow > ');
  return `child_Workflow`;
}

export async function child_Workflow2(): Promise<string> {
  console.log('child_Workflow2 > ');
  return `child_Workflow2`;
}

export interface WorkflowTypeAndArgs {
  handler: string;
  workflowType?: string;
  args: unknown[];
}

export async function existing(...args: unknown[]): Promise<WorkflowTypeAndArgs> {
  console.log('existing  ', args);
  return {
    handler: 'existing',
    args,
  };
}
