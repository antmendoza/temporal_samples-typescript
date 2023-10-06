import { TestWorkflowEnvironment } from '@temporalio/testing';
import { DefaultLogger, LogEntry, Runtime, Worker } from '@temporalio/worker';
import { v4 as uuid4 } from 'uuid';
import { processBatch } from './workflows';
import * as activities from './activities';

let testEnv: TestWorkflowEnvironment;

beforeAll(async () => {
  // Set WARN level to for clearer test output
  Runtime.install({
    logger: new DefaultLogger('WARN', (entry: LogEntry) => console.log(`[${entry.level}]`, entry.message)),
  });

  testEnv = await TestWorkflowEnvironment.createTimeSkipping();
});

afterAll(async () => {
  await testEnv?.teardown();
});

test('test processBatch', async () => {
  const { client, nativeConnection } = testEnv;
  const worker = await Worker.create({
    connection: nativeConnection,
    taskQueue: 'test',
    workflowsPath: require.resolve('./workflows'),
    activities,
  });

  await worker.runUntil(async () => {
    const result = await client.workflow.execute(processBatch, {
      workflowId: uuid4(),
      taskQueue: 'test',
    });
    expect(result).toEqual(10);
  });
});
