import { Table } from "sst/constructs";

export function StorageStack(stack, app) {
  const table = new Table(stack, "Uploads", {
    fields: {
      uploaderId: "string",
      uploadId: "string",
    },
    primaryIndex: { partitionKey: "uploaderId", sortKey: "uploadId" },
  });

  return { table };
}
