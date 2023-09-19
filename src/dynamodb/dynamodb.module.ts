import { Module } from '@nestjs/common';
import { DynamoDbService } from './dynamodb.service';
import { DynamoDbController } from './dynamodb.controller';

@Module({
  providers: [DynamoDbService],
  exports: [DynamoDbService],
  controllers: [DynamoDbController]
})
export class DynamoDbModule {}
