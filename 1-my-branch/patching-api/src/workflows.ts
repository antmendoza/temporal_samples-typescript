
import { defineQuery } from '@temporalio/workflow';
//export { myWorkflow, workflowId } from './workflows-v1';
// export { myWorkflow, workflowId } from './workflows-v2';

// export { myWorkflow, workflowId } from './workflows-v3';
 export { myWorkflow, workflowId } from './workflows-vFinal';
export const getValueQuery = defineQuery<string>('getValue');
