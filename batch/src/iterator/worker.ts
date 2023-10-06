import { DefaultLogger, LogEntry, Runtime, Worker } from '@temporalio/worker';
import * as activities from './activities';

async function run() {
  Runtime.install({
    logger: new DefaultLogger('INFO', (entry: LogEntry) => console.log(`[${entry.level}]`, entry.message)),
  });

  const worker = await Worker.create({
    workflowsPath: require.resolve('./workflows'),
    activities,
    taskQueue: 'heartbeatingactivity',
  });

  await worker.run();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
