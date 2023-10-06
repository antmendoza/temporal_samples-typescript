import { Context } from '@temporalio/activity';
import { getRecord, processRecord } from './record_processor';

export async function processRecords(): Promise<number> {
  const context = Context.current();
  let offset: number = context.info.heartbeatDetails || 1;

  /* eslint-disable no-constant-condition */
  while (true) {
    const record = getRecord(offset);
    if (!record.hasValue()) {
      return offset;
    }
    context.log.debug(`Processing record: ${JSON.stringify(record)}`, {});
    await processRecord(record);
    context.heartbeat(offset);
    offset++;
  }
}
