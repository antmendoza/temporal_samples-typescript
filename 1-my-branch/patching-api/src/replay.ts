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
    query:
      'ExecutionStatus="Running" AND (WorkflowId="patching-workflows-v3" or WorkflowId="patching-workflows-vFinal")',
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
