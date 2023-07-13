import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { Table } from "sst/node/table";

// const dynamoDb = new DynamoDBClient({ region: "us-east-1" });

// export async function main() {
//   const putParams = {
//     TableName: Table.uploads.tableName,
//     Key: {

//     }
//   };
//   const results = await dynamoDb.send(new GetItemCommand(getParams));

//   // If there is a row, then get the value of the
//   // column called "tally"
//   let count = results.Item ? results.Item.tally : 0;

//   return {
//     statusCode: 200,
//     body: count,
//   };
// }
export async function handler() {
    console.log("hi you invoked me")
    // try {
    //     const dynamoDb = new DynamoDBClient({});
    //     const data = JSON.parse(event.body);

    //     const params = {
    //         TableName: Table.uploads.tableName,
    //         Item: {
    //             uploadId: { S: crypto.randomUUID() },
    //             senderEmail: { S: data.senderEmail },
    //             recipientEmail: { S: data.recipientEmail },
    //             title: { S: data.title },
    //             description: { S: data.description },
    //             chargeCode: { S: data.chargeCode || "" },
    //             fileUrl: { S: data.downloadUrl || "" },
    //             createdAt: { N: Date.now().toString() },
    //         },
    //         ReturnConsumedCapacity: "TOTAL",
    //     };

    //     const res = await dynamoDb.send(new PutItemCommand(params));
    return {
        statusCode: 200,
        body: JSON.stringify("hi you invoked me"),
    }
    // } catch (error) {
    //     return {
    //         statusCode: 500,
    //         body: JSON.stringify(error),
    //     }
    // }
}