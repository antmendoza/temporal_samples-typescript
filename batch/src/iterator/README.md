A sample implementation of processing a batch by an Activity.

An Activity can run as long as needed.
It reports that it is still alive through Heartbeat.

If the Worker is restarted, the Activity is retried after the Heartbeat Timeout.

Temporal allows store data in Heartbeat _details_.
These details are available to the next Activity attempt.
The progress of the record processing is stored in the details to avoid reprocessing records from the beginning on failures.

### Running this sample

1. `temporal server start-dev` to start [Temporal Server](https://github.com/temporalio/cli/#installation).
2. `npm install` to install dependencies.
3. `npm run start.watch` to start the Worker.
4. In another shell, `npm run workflow` to run the Workflow.

The Workflow will return the number of items processed:

```
The answer is 42
```
