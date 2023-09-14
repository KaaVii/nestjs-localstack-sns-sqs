import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SqsService } from './sqs/sqs.service';
import { SnsService } from './sns/sns.service';
import { SnsSubscriptionService } from './sns/sns.subscription.service';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import loggerConfig from './common/logger.config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    LoggerModule.forRootAsync(loggerConfig),
  ],
  controllers: [AppController],
  providers: [AppService, SqsService, SnsService, SnsSubscriptionService],
})
export class AppModule {}
