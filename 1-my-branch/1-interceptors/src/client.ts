import { Client } from '@temporalio/client';
import { asyncActivityWorkflow, httpWorkflow } from './workflows';

async function run(): Promise<void> {
  const client = new Client();

  const result = await client.workflow.execute(httpWorkflow, {
    taskQueue: 'activities-examples',
    workflowId: 'httpWorkflow-examples',
  });
  console.log(result); // 'The answer is 42'
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
