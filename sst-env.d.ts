/* This file is auto-generated by SST. Do not edit. */
/* tslint:disable */
/* eslint-disable */
/* deno-fmt-ignore-file */
import "sst"
export {}
declare module "sst" {
  export interface Resource {
    "Auth0BaseUrl": {
      "type": "sst.sst.Secret"
      "value": string
    }
    "Auth0ClientId": {
      "type": "sst.sst.Secret"
      "value": string
    }
    "Auth0ClientSecret": {
      "type": "sst.sst.Secret"
      "value": string
    }
    "Auth0IssuerBaseUrl": {
      "type": "sst.sst.Secret"
      "value": string
    }
    "Auth0Secret": {
      "type": "sst.sst.Secret"
      "value": string
    }
    "FileUploads": {
      "name": string
      "type": "sst.aws.Bucket"
    }
    "UserUploads": {
      "name": string
      "type": "sst.aws.Dynamo"
    }
    "WebUi": {
      "type": "sst.aws.Nextjs"
      "url": string
    }
  }
}
