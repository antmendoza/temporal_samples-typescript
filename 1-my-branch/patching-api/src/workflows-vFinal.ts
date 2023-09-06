import {deprecatePatch, patched, proxyActivities, setHandler, sleep} from '@temporalio/workflow';
import type * as activities from './activities';
import {getValueQuery} from "./workflows";

const {
  activityB,
  // activityA,
  // activityThatMustRunAfterA,
} = proxyActivities<typeof activities>({
  startToCloseTimeout: '30 seconds',
});

export const workflowId = 'patching-workflows-vFinal';
// @@@SNIPSTART typescript-patching-final
// vFinal
export async function myWorkflow(): Promise<void> {

  deprecatePatch('my-change-id');

  if (patched('my-change-id')) {
    await activityB();
    await sleep('1s');
  }



  await activityB();
  console.log("Running workflow...")
  await sleep('1 days');
}
// @@@SNIPEND
