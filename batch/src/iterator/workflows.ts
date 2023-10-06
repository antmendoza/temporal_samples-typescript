import {
  ChildWorkflowHandle,
  continueAsNew,
  executeChild,
  LoggerSinks,
  proxyActivities,
  proxySinks,
  startChild,
} from '@temporalio/workflow';

import * as workflow from '@temporalio/workflow';
import type * as activities from './activities';
import { Record } from './record_processor';

const { processRecords } = proxyActivities<typeof activities>({
  startToCloseTimeout: '30m',
  heartbeatTimeout: '2s',
});
const { defaultWorkerLogger: logger } = proxySinks<LoggerSinks>();

export class Batch {
  public readonly pageSize: number;
  public readonly offset: number;

  constructor(pageSize: number, offset: number) {
    this.pageSize = pageSize;
    this.offset = offset;
  }
}

function getRecords(pageSize: number, offset: number) {
  const MAX_NUMBER = 200;
  if (offset > MAX_NUMBER) {
    return [];
  }

  const init = MAX_NUMBER - offset;
  const end = init + pageSize > MAX_NUMBER ? MAX_NUMBER : init + pageSize;

  const result = [];
  for (let initial = init; init < end; initial++) {
    result.push(new Record(initial));
  }
  return result;
}

export async function recordProcessor(record: Record): Promise<null> {
  return null;
}

export async function processBatch(batch: Batch): Promise<number> {
  // Loads a page of records
  const records: Record[] = getRecords(batch.pageSize, batch.offset);

  workflow.makeContinueAsNewFunc();
  // Starts a child per record asynchrnously.
  const handles: Array<ChildWorkflowHandle<any>> = await Promise.all(
    records.map((record) => {
      return startChild(recordProcessor, {
        workflowId: 'recordProcessor' + record.offset,
        args: [record],
      });
    })
  );

  handles.forEach((handle) => {
    void handle.result();
  });

  return continueAsNew({
    pageSize: batch.pageSize,
    offset: batch.offset + records.length,
  });

  return 2;
}
