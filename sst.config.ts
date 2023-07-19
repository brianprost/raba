import { SSTConfig } from "sst";
import { Cron, Config, Bucket, NextjsSite, Api, Table } from "sst/constructs";
import { config } from "dotenv";
config();

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
      const table = new Table(stack, "userUploads", {
        fields: {
          uploadId: "string",
          senderEmail: "string",
          recipientEmail: "string",
          title: "string",
          description: "string",
          chargeCode: "string",
          fileUrl: "string",
          createdAt: "string",
          expiresOn: "string",
        },
        primaryIndex: { partitionKey: "senderEmail", sortKey: "uploadId" },
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
        environment: {
          AUTH0_SECRET: process.env.AUTH0_SECRET!,
          AUTH0_BASE_URL: app.stage == "prod" ? "https://d31ei8kk0mhc1.cloudfront.net" : process.env.AUTH0_BASE_URL!,
          AUTH0_ISSUER_BASE_URL: process.env.AUTH0_ISSUER_BASE_URL!,
          AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID!,
          AUTH0_CLIENT_SECRET: process.env.AUTH0_CLIENT_SECRET!,
        },
      });
      new Cron(stack, "cron", {
        schedule: "rate(1 hour)",
        job: {
          function: {
            bind: [bucket, table],
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
