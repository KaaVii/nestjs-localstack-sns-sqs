import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';

@Injectable()
export class DynamoDbService {

  private readonly dynamoDb: AWS.DynamoDB;

  constructor() {
    console.log('Initializing DynamoDB service...');

    this.dynamoDb = new AWS.DynamoDB({
      endpoint: process.env.AWS_ENDPOINT_URL,
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_DEFAULT_REGION
    })
  }

  async createItem(tableName: string, item: Record<string, any>): Promise<void> {
    const params: AWS.DynamoDB.PutItemInput = {
      TableName: tableName,
      Item: AWS.DynamoDB.Converter.marshall(item),
    };
    console.log('Creating item in DynamoDB...'
      + '\nTableName: ' + tableName
      + '\nItem: ' + JSON.stringify(item, null, 2)
    );
    await this.dynamoDb.putItem(params).promise();
  }

  async getItem(tableName: string, key: Record<string, any>): Promise<any | null> {
    const params: AWS.DynamoDB.GetItemInput = {
      TableName: tableName,
      Key: AWS.DynamoDB.Converter.marshall(key),
    };

    const response = await this.dynamoDb.getItem(params).promise();
    return response.Item ? AWS.DynamoDB.Converter.unmarshall(response.Item) : null;
  }

  async updateItem(tableName: string, key: Record<string, any>, updateExpression: string, expressionAttributeValues: Record<string, any>): Promise<void> {
    const params: AWS.DynamoDB.UpdateItemInput = {
      TableName: tableName,
      Key: AWS.DynamoDB.Converter.marshall(key),
      UpdateExpression: updateExpression,
      ExpressionAttributeValues: AWS.DynamoDB.Converter.marshall(expressionAttributeValues),
    };

    await this.dynamoDb.updateItem(params).promise();
  }

  async deleteItem(tableName: string, key: Record<string, any>): Promise<void> {
    const params: AWS.DynamoDB.DeleteItemInput = {
      TableName: tableName,
      Key: AWS.DynamoDB.Converter.marshall(key),
    };

    await this.dynamoDb.deleteItem(params).promise();
  }

  async getAllItems(tableName: string): Promise<any[]> {
    const params: AWS.DynamoDB.ScanInput = {
      TableName: tableName,
    };
    console.log('Scanning DynamoDB table ' + tableName + '...');
    const response = await this.dynamoDb.scan(params).promise();
    if (response.Items && response.Items.length > 0) {
      return response.Items.map((item) => AWS.DynamoDB.Converter.unmarshall(item));
    } else {
      return [];
    }
  }
}
