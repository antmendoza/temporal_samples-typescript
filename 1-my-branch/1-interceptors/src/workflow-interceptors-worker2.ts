import { StartChildWorkflowExecutionInput, WorkflowInterceptorsFactory } from '@temporalio/workflow';

// Export the interceptors
export const interceptors: WorkflowInterceptorsFactory = () => ({
  inbound: [
    {
      execute(input, next) {
        console.log('execute inbound ', input);

        const cloned = Object.assign(input, { workflowType: 'child_Workflow' }); //Note this will
        return next(cloned);
      },
    },
  ],
});
