import type { NextApiRequest, NextApiResponse } from "next";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { Table } from "sst/node/table";

type UploadDbRecord = {
    uploadId: string;
    senderEmail: string;
    recipientEmail: string;
    title: string;
    description: string;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const uploadDeets = JSON.parse(req.body) as UploadDbRecord;
        const params = {
            TableName: Table.uploadsDb.tableName,
            Key: {
                uploadId: uploadDeets.uploadId,
            },
            Item: {
                uploadId: uploadDeets.uploadId,
                senderEmail: uploadDeets.senderEmail,
                recipientEmail: uploadDeets.recipientEmail,
                title: uploadDeets.title,
                description: uploadDeets.description,
            },
        }
        // Create an Amazon DynamoDB service client object.
        const db = new DynamoDBClient({ region: "us-east-1" });
        try {
            const command = new PutCommand(params);
            const data = await db.send(command);
            console.log("Success - put", data);
        } catch (err) {
            console.log("Error - put", err);
        }
        res.status(200)
    } catch (err) {
        res.status(500)
    }
}
