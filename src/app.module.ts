import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SqsService } from './services/sqs/sqs.service';
import { SnsService } from './services/sns/sns.service';  
import { SnsSubscriptionService } from './services/sns/sns.subscription.service';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import { S3Service } from './services/s3/s3.service';
import { DynamodbService } from './services/dynamodb/dynamodb.service';
import loggerConfig from './common/config/logger.config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    LoggerModule.forRootAsync(loggerConfig),
  ],
  controllers: [AppController],
  providers: [AppService, SqsService, SnsService, SnsSubscriptionService, S3Service, DynamodbService],
})
export class AppModule {}
