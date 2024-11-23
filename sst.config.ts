/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "raba",
      removal: input?.stage === "prod" ? "retain" : "remove",
      home: "aws",
    };
  },
  async run() {
    const fileUploadsBucket = new sst.aws.Bucket("FileUploads", {
      public: true,
    });
    const userUploadsTable = new sst.aws.Dynamo("UserUploads", {
      fields: {
        uploadId: "string",
        senderEmail: "string",
        recipientEmail: "string",
        // title: "string",
        // description: "string",
        // chargeCode: "string",
        // fileUrl: "string",
        // createdAt: "string",
        // expiresOn: "string",
      },
      primaryIndex: { hashKey: "senderEmail", rangeKey: "uploadId" },
      globalIndexes: {
        uploadIdIndex: { hashKey: "uploadId" },
        recipientEmailIndex: { hashKey: "recipientEmail" },
      },
    });
    const deleteCronJob = new sst.aws.Cron("RabaDeleteCronJob", {
      job: {
        handler: "functions/delete.handler",
        runtime: "nodejs20.x",
        link: [fileUploadsBucket, userUploadsTable],
      },
      schedule: "rate(1 hour)",
    });

    const auth0Secret = new sst.Secret("Auth0Secret");
    const auth0BaseUrl = new sst.Secret("Auth0BaseUrl");
    const auth0IssuerBaseUrl = new sst.Secret("Auth0IssuerBaseUrl");
    const auth0ClientId = new sst.Secret("Auth0ClientId");
    const auth0ClientSecret = new sst.Secret("Auth0ClientSecret");

    new sst.aws.Nextjs("WebUi", {
      link: [fileUploadsBucket, userUploadsTable],
      environment: {
        // todo: change these to just use the values in the runtime from secrets manager
        AUTH0_SECRET: auth0Secret.value,
        AUTH0_BASE_URL: auth0BaseUrl.value,
        AUTH0_ISSUER_BASE_URL: auth0IssuerBaseUrl.value,
        AUTH0_CLIENT_ID: auth0ClientId.value,
        AUTH0_CLIENT_SECRET: auth0ClientSecret.value,
      },
    });
  },
});
