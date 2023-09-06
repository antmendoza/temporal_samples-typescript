import { proxyActivities, sleep } from '@temporalio/workflow';
import type * as activities from './activities';

const { activityA} = proxyActivities<typeof activities>({
  startToCloseTimeout: '30 seconds',
});

const { activityThatMustRunAfterA } = proxyActivities<typeof activities>({
  startToCloseTimeout: '40 seconds',
});


export const workflowId = 'patching-workflows-v1';
// @@@SNIPSTART typescript-patching-1
// v1
export async function myWorkflow(): Promise<void> {
  await activityA();
  await sleep('1 days'); // arbitrary long sleep to simulate a long running workflow we need to patch
  await activityThatMustRunAfterA();
}
// @@@SNIPEND
