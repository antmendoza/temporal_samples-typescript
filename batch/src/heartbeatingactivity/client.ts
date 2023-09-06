import { Connection, Client } from '@temporalio/client';
import {processBatch} from './workflows';

async function run() {
  const connection = await Connection.connect();
  const client = new Client({ connection });

  const handle = await client.workflow.start(processBatch, {
    taskQueue: 'heartbeatingactivity',
    workflowId: 'heartbeatingactivity',
  });
  const result =  await handle.result();
  console.log('Num of records processed:', result);

}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
