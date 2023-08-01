import { Client } from '@temporalio/client';
import { replayTest } from './workflows';

async function run(): Promise<void> {
  const client = new Client();

  const _handle = await client.workflow.start(replayTest, {
    taskQueue: 'state',
    workflowId: 'runReplayId',
  });

  console.log("Workflow 'runReplayId' started. You can now signal, query, or cancel it.");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
