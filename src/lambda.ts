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

  // Check if the event is an SNS event
  if (event?.Records?.[0]?.Sns) {
    const snsMessage = JSON.parse(event.Records[0].Sns.Message);
    // Handle the SNS message
    console.log('Received SNS message:', snsMessage);

    // Inject DynamoDBService
    const dynamoDBService = new DynamoDbService();

    // Define your DynamoDB table name
    const tableName = 'my-table';

    // Store the SNS message data in DynamoDB
    try {
      // Get the current epoch time in milliseconds
      const epochTimeInMilliseconds = new Date().getTime();

      // Convert the epoch time to a string
      const epochTimeAsString = epochTimeInMilliseconds.toString();

      console.log(`Epoch Time as String: ${epochTimeAsString}`);
      const itemToStore = {
        "id": epochTimeAsString,
        "message": snsMessage
      };
      await dynamoDBService.createItem(tableName, itemToStore);

      // Implement any additional logic or return responses here
    } catch (error) {
      console.error('Error storing SNS message in DynamoDB:', error);
      // Handle the error and return appropriate responses if needed
    }
  }

  return proxy(event, context);
};
