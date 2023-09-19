import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException, BadRequestException } from '@nestjs/common';
import { DynamoDbService } from './dynamodb.service';

@Controller('dynamodb')
export class DynamoDbController {
  constructor(private readonly dynamoDbService: DynamoDbService) {}

  @Post(':tableName')
  async createItem(
    @Param('tableName') tableName: string,
    @Body() item: Record<string, any>,
  ): Promise<void> {
    try {
      await this.dynamoDbService.createItem(tableName, item);
    } catch (error) {
      throw new BadRequestException('Failed to create item in DynamoDB.');
    }
  }

  @Get(':tableName/:id')
  async getItem(
    @Param('tableName') tableName: string,
    @Param('id') id: string,
  ): Promise<any> {
    try {
      const key = { ID: id }; // Replace 'ID' with your actual key attribute name
      const item = await this.dynamoDbService.getItem(tableName, key);
      if (!item) {
        throw new NotFoundException('Item not found in DynamoDB.');
      }
      return item;
    } catch (error) {
      throw new BadRequestException('Failed to retrieve item from DynamoDB.');
    }
  }

  @Put(':tableName/:id')
  async updateItem(
    @Param('tableName') tableName: string,
    @Param('id') id: string,
    @Body() updateData: Record<string, any>,
  ): Promise<void> {
    try {
      const key = { ID: id }; // Replace 'ID' with your actual key attribute name
      const updateExpression = 'SET ' + Object.keys(updateData).map(key => `#${key} = :${key}`).join(', ');
      const expressionAttributeValues = Object.entries(updateData).reduce((acc, [key, value]) => {
        acc[`:${key}`] = value;
        return acc;
      }, {});
      await this.dynamoDbService.updateItem(tableName, key, updateExpression, expressionAttributeValues);
    } catch (error) {
      throw new BadRequestException('Failed to update item in DynamoDB.');
    }
  }

  @Delete(':tableName/:id')
  async deleteItem(
    @Param('tableName') tableName: string,
    @Param('id') id: string,
  ): Promise<void> {
    try {
      const key = { ID: id }; // Replace 'ID' with your actual key attribute name
      await this.dynamoDbService.deleteItem(tableName, key);
    } catch (error) {
      throw new BadRequestException('Failed to delete item from DynamoDB.');
    }
  }
}
