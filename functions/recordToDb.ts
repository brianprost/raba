// import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
// import { Table } from "sst/node/table";

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