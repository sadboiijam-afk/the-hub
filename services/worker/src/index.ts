import { createRedactedLogEvent } from "@lucid/config";

export interface WorkerStatus {
  readonly service: "worker";
  readonly queuesConfigured: readonly string[];
}

export function getWorkerStatus(): WorkerStatus {
  createRedactedLogEvent({
    event: "worker.status.checked"
  });

  return {
    service: "worker",
    queuesConfigured: []
  };
}

if (process.env.NODE_ENV !== "test") {
  console.log(JSON.stringify(getWorkerStatus()));
}
