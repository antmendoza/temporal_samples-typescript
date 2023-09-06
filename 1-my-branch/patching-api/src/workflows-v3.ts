import {patched, proxyActivities, sleep} from '@temporalio/workflow';
import type * as activities from './activities';

const {
  activityB,
  // activityA,
  // activityThatMustRunAfterA,
} = proxyActivities<typeof activities>({
  startToCloseTimeout: '30 seconds',
});

export const workflowId = 'patching-workflows-v3';
// @@@SNIPSTART typescript-patching-3
// v3
import { deprecatePatch } from '@temporalio/workflow';

export async function myWorkflow(): Promise<void> {


  if (patched('my-change-id')) {
    await activityB();
    await sleep('1s');
  }

  await activityB();
  await sleep('1 days');

}
// @@@SNIPEND
