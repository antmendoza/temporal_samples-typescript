import {
  proxyActivities,
  StartChildWorkflowExecutionInput,
  WorkflowExecuteInput,
  workflowInfo,
  WorkflowInterceptorsFactory,
} from '@temporalio/workflow';

import type * as activities from './activities';

// Export the interceptors
export const interceptors: WorkflowInterceptorsFactory = () => ({
  internals: [{}],

  outbound: [
    {
      startChildWorkflowExecution(input, next) {
        console.log('execute outbound ', input);

        const cloned = Object.assign(input, { workflowType: 'child_Workflow' }); //Note this will

        console.log('execute outbound cloned', cloned);
        return next(cloned);
      },
    },
  ],
  inbound: [
    {
      async execute(input: WorkflowExecuteInput, next) {
        const { checkAndReturn } = proxyActivities<typeof activities>({
          startToCloseTimeout: '1 minute',
        });

        console.log('execute inbound ', input);
        console.log('workflowInfo().historyLength ', workflowInfo().historyLength);

        const result = await checkAndReturn();

        console.log('result ', result);
        console.log('input ', input);

        const cloned = Object.assign(input, { workflowType: 'child_Workflow' }, { args: ['child_Workflow'] }); //Note this will
        console.log('cloned ', cloned);
        return next(cloned);
      },
    },
  ],
});
