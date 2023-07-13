import { SSTConfig } from "sst";
import { Cron, Config, Bucket, NextjsSite, Api, Table } from "sst/constructs";

export default {
  config(_input) {
    return {
      name: "raba",
      region: "us-east-1",
    };
  },
  stacks(app) {
    app.stack(function Site({ stack }) {
      const bucket = new Bucket(stack, "fileUploads", {
        cors: true,
      });
      const table = new Table(stack, "uploads", {
        fields: {
          uploadId: "string",
          senderEmail: "string",
          recipientEmail: "string",
          title: "string",
          description: "string",
          chargeCode: "string",
          fileUrl: "string",
          createdAt: "string",
        },
        primaryIndex: { partitionKey: "uploadId" },
      });
      const api = new Api(stack, "api", {
        defaults: {
          function: {
            bind: [table, bucket],
          }
        },
        routes: {
          // "GET /": "/functions/auth.handler",
          // "POST /db": "/functions/db.handler",
        }
      });
      const site = new NextjsSite(stack, "ui", {
        bind: [bucket, table],
      });
      new Cron(stack, "cron", {
        schedule: "rate(1 day)",
        job: {
          function: {
            bind: [bucket],
            handler: "functions/delete.handler",
          },
        },
      });

      stack.addOutputs({
        ApiEndpoint: api.url,
        SiteUrl: site.url,
      });
    });
  },
} satisfies SSTConfig;
