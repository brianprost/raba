import type { NextApiRequest, NextApiResponse } from "next";
import { DynamoDBClient, QueryCommand } from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import { Table } from "sst/node/table";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const senderEmail = req.query.senderEmail as string;
    if (!senderEmail) {
        return res.status(400).json({ message: "Missing email query parameter" });
    }

    const db = new DynamoDBClient({ region: "us-east-1" });

    const params = {
        TableName: Table.userUploads.tableName,
        KeyConditionExpression: "senderEmail = :senderEmail",
        ExpressionAttributeValues: marshall({
            ":senderEmail": senderEmail,
        }),
    };

    try {
        const queryCommand = new QueryCommand(params);
        const data = await db.send(queryCommand);
        const items = data.Items?.map(item => unmarshall(item)) || [];
        return res.status(200).json(items);
    } catch (err) {
        console.log("Error - query", err);
        return res.status(500).json({ message: "Internal server error" });
    }
}
