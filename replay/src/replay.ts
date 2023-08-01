import { Client } from '@temporalio/client';
import { DefaultLogger, Runtime, Worker } from '@temporalio/worker';

export async function runReplay(): Promise<void> {
  Runtime.install({
    logger: new DefaultLogger('DEBUG', (entry) => {
      console.log(entry);
    }),
  });

  const client = new Client();

  const namespace = 'default';
  const result = await client.workflowService.listWorkflowExecutions({
    namespace,
    query: 'WorkflowType="replayTest"',
  });

  console.log('result length: ' + result.executions.length);

  for (const executionInfo of result.executions) {
    const history = await client.workflowService.getWorkflowExecutionHistory({
      namespace,
      execution: executionInfo.execution,
    });

    const replayResults = await Worker.runReplayHistory(
      {
        workflowsPath: require.resolve('./workflows'),
        // ...
      },
      history.history
    );
  }
}

runReplay().catch((err) => {
  console.error(err);
  process.exit(1);
});
