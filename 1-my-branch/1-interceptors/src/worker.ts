import { Worker } from '@temporalio/worker';
import * as activities from './activities';
import { workflowInfo } from '@temporalio/workflow';

const taskQueue = 'activities-examples';

async function run() {
  const worker = await Worker.create({
    workflowsPath: require.resolve('./workflows'),
    activities,
    taskQueue,
    interceptors: {
      // example contains both workflow and interceptors
      workflowModules: [require.resolve('./workflow-interceptors')],
    },
  });
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
