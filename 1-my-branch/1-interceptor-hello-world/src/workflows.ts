// @@@SNIPSTART typescript-hello-workflow
import { proxyActivities, sleep, workflowInfo } from '@temporalio/workflow';
// Only import the activity types
import type * as activities from './activities';

const { greet } = proxyActivities<typeof activities>({
  startToCloseTimeout: '1 minute',
});

/** A workflow that simply calls an activity */
export async function example(name: string): Promise<string> {
  console.log(name);

  await greet(name);
  await greet(name);
  await greet(name);
  await greet(name);
  await greet(name);

  await sleep('30s');
  return await greet(name);
}
// @@@SNIPEND
