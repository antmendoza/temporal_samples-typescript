// @@@SNIPSTART typescript-hello-client
import { Connection, Client } from '@temporalio/client';
import { example } from './workflows';
import { nanoid } from 'nanoid';

async function run() {
  // Connect to the default Server location
  const connection = await Connection.connect({ address: 'localhost:7233' });
  // In production, pass options to configure TLS and other settings:
  // {
  //   address: 'foo.bar.tmprl.cloud',
  //   tls: {}
  // }

  const client = new Client({
    connection,
    // namespace: 'foo.bar', // connects to 'default' namespace if not specified
  });

  const promises = [];

  for (let i = 0; i <= 3000; i++) {
    promises.push(
      await client.workflow.start(example, {
        taskQueue: 'hello-world',
        // type inference works! args: [name: string]
        args: ['Temporal'],
        // in practice, use a meaningful business ID, like customerId or transactionId
        workflowId: 'workflow-' + nanoid(),
      })
    );
  }

  await Promise.all(promises);

  //Wait for all to complete
  for (const promise of promises) {
    await promise.result();
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
// @@@SNIPEND
