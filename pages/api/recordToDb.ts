import type { NextApiRequest, NextApiResponse } from "next";
import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocument, PutCommand } from "@aws-sdk/lib-dynamodb";
import { Table } from "sst/node/table";

type ReqParams = {
    id: string;
    senderEmail: string;
    recipientEmail: string;
    title: string;
    description: string;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    console.log(`hi i ran`)
    try {
        const uploadDeets = req.body as ReqParams;
        console.log("params", uploadDeets)
        // Create an Amazon DynamoDB service client object.
        const db = DynamoDBDocument.from(new DynamoDBClient({ region: "us-east-1" }),
            { marshallOptions: { convertEmptyValues: true, removeUndefinedValues: true } });
        try {
            const data = await db.send(new PutCommand({
                TableName: Table.uploadDb.tableName,
                // Key: { uploadId: uploadDeets.id},
                // UpdateExpression: "set senderEmail = :senderEmail, recipientEmail = :recipientEmail, title = :title, description = :description",
                // ExpressionAttributeNames: {
                //     "#uploadId": "uploadId",
                //     "#senderEmail": "senderEmail",
                //     "#recipientEmail": "recipientEmail",
                //     "#title": "title",
                //     "#description": "description",
                // },
                // ExpressionAttributeValues: {
                //     ":senderEmail": uploadDeets.senderEmail,
                //     ":recipientEmail": uploadDeets.recipientEmail,
                //     ":title": uploadDeets.title,
                //     ":description": uploadDeets.description,
                // },
                Item: {
                    uploadId: { S: uploadDeets.id },
                    senderEmail: { S: uploadDeets.senderEmail },
                    recipientEmail: { S: uploadDeets.recipientEmail },
                    title: { S: uploadDeets.title },
                    description: { S: uploadDeets.description },
                },
            }));
            console.log("Success - put", data);
        } catch (err) {
            console.log("Error - put", err);
        }
        res.status(200)
    } catch (err) {
        res.status(500)
    }
}





