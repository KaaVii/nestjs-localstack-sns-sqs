import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { S3Module } from './s3/s3.module';
import { SqsModule } from './sqs/sqs.module';
import { SnsModule } from './sns/sns.module';
import { AppService } from './app.service';
import { DynamoDbModule } from './dynamodb/dynamodb.module';
import { Settings } from './common/config/config.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    S3Module,
    SqsModule,
    SnsModule,
    DynamoDbModule,
    Settings
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
