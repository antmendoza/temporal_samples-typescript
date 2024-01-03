import { StartChildWorkflowExecutionInput, WorkflowInterceptorsFactory } from '@temporalio/workflow';

// Export the interceptors
export const interceptors: WorkflowInterceptorsFactory = () => ({
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
});
