import { Module } from '@nestjs/common';
import { DynamoDbService } from './dynamodb.service';

@Module({
  providers: [DynamoDbService],
  exports: [DynamoDbService],
})
export class DynamoDbModule {}
