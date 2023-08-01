import { SSTConfig } from "sst";
import { Cron, Bucket, NextjsSite, Api, Table } from "sst/constructs";
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
      const site = new NextjsSite(stack, "ui", {
        environment: {
          AUTH0_BASE_URL: app.stage == "prod" ? "https://d31ei8kk0mhc1.cloudfront.net" : process.env.AUTH0_BASE_URL!,
        },
      });

      stack.addOutputs({
        SiteUrl: site.url,
      });
      app.setDefaultRemovalPolicy("destroy");
    });
  },
} satisfies SSTConfig;
