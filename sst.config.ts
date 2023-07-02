import { SSTConfig } from "sst";
import { Cron, Bucket, NextjsSite, Auth, Api, Table } from "sst/constructs";

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
        },
        primaryIndex: { partitionKey: "uploadId" },
      });
      const api = new Api(stack, "api", {
        defaults: {
          function: {
            bind: [table, bucket]
          }
        },
        routes: {
          "GET /": "packages/functions/src/auth.handler",
          "POST /recordToDb": "packages/functions/src/recordToDb.handler",
        }
      });
      const site = new NextjsSite(stack, "ui", {
        bind: [bucket, table],
      });
      const auth = new Auth(stack, "auth", {
        authenticator: {
          handler: "packges/functions/src/auth.handler",
          bind: [site],
        },
      });

      auth.attach(stack, {
        api,
        prefix: "/auth",
      })
      new Cron(stack, "cron", {
        schedule: "rate(1 day)",
        job: {
          function: {
            bind: [bucket],
            handler: "functions/delete.handler",
          },
        },
      })

      stack.addOutputs({
        ApiEndpoint: api.url,
        SiteUrl: site.url,
      });
    });
  },
} satisfies SSTConfig;
