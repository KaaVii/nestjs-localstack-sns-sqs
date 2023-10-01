import * as awsLambdaFastify from '@fastify/aws-lambda';
import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Context,
} from 'aws-lambda';
import { FastifyInstance } from 'fastify';
import { bootstrap } from './app';
import { DynamoDbService } from './dynamodb/dynamodb.service'; // Import your DynamoDB service

let server: FastifyInstance;
let proxy: awsLambdaFastify.PromiseHandler;

export const handler = async (
  event: APIGatewayProxyEvent,
  context: Context,
): Promise<APIGatewayProxyResult> => {
  if (!server) {
    const app = await bootstrap();
    server = app.getHttpAdapter()?.getInstance() as FastifyInstance;
    proxy = awsLambdaFastify(server);
  }
  console.log(server.printRoutes());

  // Process SQS messages
  if (event.Records) {
    const dynamoDBService = new DynamoDbService();
    const tableName = 'my-table';

    for (const record of event.Records) {
      const sqsMessage = JSON.parse(record.body); // Parse SQS message body

      // Handle the SQS message
      console.log('Received SQS message:', sqsMessage);

      try {
        const epochTimeInMilliseconds = new Date().getTime();
        const epochTimeAsString = epochTimeInMilliseconds.toString();

        console.log(`Epoch Time as String: ${epochTimeAsString}`);
        const itemToStore = {
          id: epochTimeAsString,
          message: sqsMessage,
        };
        await dynamoDBService.createItem(tableName, itemToStore);

        // Implement any additional logic or return responses here
      } catch (error) {
        console.error('Error storing SQS message in DynamoDB:', error);
        // Handle the error and return appropriate responses if needed
      }
    }
  }
  return proxy(event, context);
};
