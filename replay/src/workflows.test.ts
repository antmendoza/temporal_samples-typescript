import { Worker, Runtime, DefaultLogger, LogEntry } from '@temporalio/worker';
import { Client } from '@temporalio/client';
import { HistoryAndWorkflowId } from '@temporalio/common';

test('test replay', async () => {
  const client = new Client();
  const asyncWorkflowListIterable = await client.workflow.list({ query: 'WorkflowType="trackState"' });

  console.log(JSON.stringify(asyncWorkflowListIterable));

  const histories: AsyncIterable<HistoryAndWorkflowId> = asyncWorkflowListIterable.intoHistories({ concurrency: 10 });

  console.log(JSON.stringify(histories));

  const replayResults = await Worker.runReplayHistories(
    {
      workflowsPath: require.resolve('./workflows'),
      // ...
    },
    histories
  );
  console.log(JSON.stringify(replayResults));
  console.log(`Found ${replayResults} replay errors`);
});
