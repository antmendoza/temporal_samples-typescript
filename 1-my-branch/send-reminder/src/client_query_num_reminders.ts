// @@@SNIPSTART typescript-hello-client
import { Connection, Client } from '@temporalio/client';
import { example } from './workflows';
import { nanoid } from 'nanoid';

async function run() {
  const connection = await Connection.connect();

  const client = new Client({
    connection,
  });

  const handle = await client.workflow
    .getHandle('send-reminder')
    .query('getNumReminders')
    .then((numReminders) => {
      console.log('Num of reminder sent ' + numReminders);
    });
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
// @@@SNIPEND
