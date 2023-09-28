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
      const key = { ID: id };
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
      const key = { ID: id };
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

  @Get(':tableName')  
  async getAllItems(@Param('tableName') tableName: string): Promise<any[]> {
    try {
      const items = await this.dynamoDbService.getAllItems(tableName);
      if (!items || items.length === 0) {
        throw new NotFoundException('No items found in DynamoDB.');
      }
      return items;
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Failed to retrieve items from DynamoDB.');
    }
  }

  //createa  get controller to consume the service from the dynamodbservice that list the tables in dynamodb
  @Get('listTables')
  async listTables(): Promise<any> {
    try {
      const tables = await this.dynamoDbService.listTables();
      if (!tables) {
        throw new NotFoundException('No tables found in DynamoDB.');
      }
      return tables;
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Failed to retrieve tables from DynamoDB.');
    }
  }

  @Get('describeTable/:tableName')
  async describeTable(@Param('tableName') tableName: string): Promise<any> {
    try {
      const table = await this.dynamoDbService.describeTable(tableName);
      if (!table) {
        throw new NotFoundException('No table found in DynamoDB.');
      }
      return table;
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Failed to retrieve table from DynamoDB.');
    }
  }
}