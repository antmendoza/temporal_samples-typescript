import { condition, defineSignal, setHandler, sleep } from '@temporalio/workflow';

export const setValueSignal = defineSignal<[string, number]>('setValue');

export async function trackState(): Promise<void> {
  let workResolved = false;
  setHandler(setValueSignal, (key, value) => {
    workResolved = true;
  });

  while (workResolved === false) {
    await condition(() => workResolved);
    await sleep('3 seconds');
  }
}
