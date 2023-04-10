import { SSTConfig } from "sst";
import { Cron, Bucket, NextjsSite } from "sst/constructs";

export default {
  config(_input) {
    return {
      name: "raba",
      region: "us-east-1",
    };
  },
  stacks(app) {
    app.stack(function Site({ stack }) {
      const bucket = new Bucket(stack, "public", {
        cors: true,
      });
      const site = new NextjsSite(stack, "site", {
        bind: [bucket],
      });
      new Cron(stack, "cron", {
        schedule: "rate(1 day)",
        job: {
          function: {
            bind: [bucket],
            handler: "function/delete.handler",
          },
        },
      })

      stack.addOutputs({
        SiteUrl: site.url,
      });
    });
  },
} satisfies SSTConfig;
