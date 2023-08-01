import { Connection, Client, ScheduleOverlapPolicy } from '@temporalio/client';
import { reminder } from './workflows';

async function run() {
  const client = new Client({
    connection: await Connection.connect(),
  });

  const scheduleInfo = await client.schedule.getHandle('sample-schedulexxx');

  await scheduleInfo.describe().then((s) => {
    const scheduleExecutionResults = s.info.recentActions;
    const scheduleExecutionResult = scheduleExecutionResults[scheduleExecutionResults.length - 1];
    console.log('Latest workflowId' + scheduleExecutionResult.action.workflow.workflowId);
  });

  await client.connection.close();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
