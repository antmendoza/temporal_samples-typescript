// @@@SNIPSTART typescript-hello-workflow
import { proxyActivities, sleep, defineSignal, setHandler, defineQuery } from '@temporalio/workflow';
// Only import the activity types
import type * as activities from './activities';

const { sendEmail } = proxyActivities<typeof activities>({
  startToCloseTimeout: '10 seconds',
});

export const stopReminder = defineSignal('stopReminder');
export const getNumReminders = defineQuery<number>('getNumReminders');

/** A workflow that simply calls an activity */
export async function example(userId: string): Promise<void> {
  let sendReminder = true;
  let numReminders = 0;
  setHandler(stopReminder, () => {
    sendReminder = false;
  });

  setHandler(getNumReminders, () => {
    return numReminders;
  });

  // eslint-disable-next-line no-constant-condition
  while (sendReminder) {
    //        console.log("about to send reminder: ")

    await sendEmail(userId, numReminders++);
    await sleep('2 seconds');
  }

  return;
}

// @@@SNIPEND
