import { Connection, Client } from '@temporalio/client';
import { example } from './workflows';
import { nanoid } from 'nanoid';
import { Worker } from '@temporalio/worker';

async function run() {
  const connection = await Connection.connect({ address: 'localhost:7233' });

  const client = new Client({
    connection,
  });

  const eventStartTime = new Date();

  const executions = client.workflow.list({
    query: 'TaskQueue="hello-world" and StartTime >= "2000-02-20T00:00:00.000Z"',
  });
  const histories = executions.intoHistories();
  const results = Worker.runReplayHistories(
    {
      workflowsPath: require.resolve('./workflows'),
    },
    histories
  );
  for await (const result of results) {
    if (result.error) {
      console.error('Replay failed', result);
    }
  }
  const eventEndTime = new Date();
  const duration = eventEndTime.valueOf() - eventStartTime.valueOf();
  console.log('Duration in seconds: ' + duration / 1000);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
// @@@SNIPEND
