# Workflow replay

### Running this sample

1. `temporal server start-dev` to start [Temporal Server](https://github.com/temporalio/cli/#installation).
1. `npm install` to install dependencies.
1. `npm run start.watch` to start the Worker.
1. In another shell, `npm run client_create_backlog` to run 3000 workflows.
1. Once the previous command has finished, runn `npm run client_replay` to run previous workflows through replay.
