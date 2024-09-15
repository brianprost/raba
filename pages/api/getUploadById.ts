import type { NextApiRequest, NextApiResponse } from "next";
import { DynamoDBClient, QueryCommand } from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import { Resource } from "sst";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const uploadId = req.query.uploadId as string;
  if (!uploadId) {
    return res
      .status(400)
      .json({ message: "Missing uploadId query parameter" });
  }

  const db = new DynamoDBClient({ region: "us-east-1" });

  const params = {
    TableName: Resource.UserUploads.name,
    IndexName: "uploadIdIndex",
    KeyConditionExpression: "uploadId = :uploadId",
    ExpressionAttributeValues: {
      ":uploadId": { S: uploadId },
    },
  };

  try {
    const queryCommand = new QueryCommand(params);
    const data = await db.send(queryCommand);
    return res.status(200).json(data.Items?.map((item) => unmarshall(item))[0]);
  } catch (err) {
    console.log("Error - query", err);
    return res
      .status(500)
      .json({ error: err, message: "Internal server error" });
  }
}
