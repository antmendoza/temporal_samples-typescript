// @@@SNIPSTART typescript-hello-client
import { Connection, Client } from '@temporalio/client';
import { example } from './workflows';
import { nanoid } from 'nanoid';

async function run() {
  const connection = await Connection.connect();

  const client = new Client({
    connection,
  });

  const handle = await client.workflow.getHandle('send-reminder').signal('stopReminder');
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
// @@@SNIPEND
