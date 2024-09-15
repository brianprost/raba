import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { DynamoDBClient, ScanCommand } from "@aws-sdk/client-dynamodb";
import { UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { Resource } from "sst";
import type { UploadDbRecord } from "../components/types/UploadDbRecord";

export async function handler() {
  const db = new DynamoDBClient({ region: "us-east-1" });
  let fileRecords: UploadDbRecord[] = [];
  const params = {
    TableName: Resource.UserUploads.name,
  };
  try {
    const data = await db.send(new ScanCommand(params));
    console.log("Success - scan", data);
    fileRecords =
      data.Items?.map((item) => {
        // TODO i hate this 👇
        return {
          uploadId: item.uploadId.S!,
          senderEmail: item.senderEmail.S!,
          recipientEmail: item.recipientEmail.S!,
          title: item.title.S!,
          description: item.description.S!,
          chargeCode: item.chargeCode?.S,
          fileUrl: item.fileUrl.S!,
          createdAt: item.createdAt?.S ?? "",
          expiresOn: item.expiresOn?.S ?? "",
        };
      }) || [];
  } catch (err) {
    console.log("Error - scan", err);
  }

  const s3 = new S3Client({});

  await Promise.all(
    (fileRecords || []).map(async (record) => {
      if (record.expiresOn > new Date().toISOString()) {
        return;
      }
      s3.send(
        new DeleteObjectCommand({
          Key: record.uploadId,
          Bucket: Resource.FileUploads.name,
        }),
      );
      const updateDbParams = {
        TableName: Resource.UserUploads.name,
        Key: {
          senderEmail: record.senderEmail,
          uploadId: record.uploadId,
        },
        UpdateExpression: "set fileUrl = :fileUrl",
        ExpressionAttributeValues: {
          ":fileUrl": "",
        },
      };
      try {
        const command = new UpdateCommand(updateDbParams);
        const dbRes = await db.send(command);
        console.log("Success - update", dbRes);
      } catch (err) {
        console.log("Error - update", err);
      }
    }),
  );
}
