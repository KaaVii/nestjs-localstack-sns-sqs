import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';

import loggerConfig from './common/config/logger.config';
import { SnsController } from './sns/sns.controller';
import { S3Module } from './s3/s3.module';
import { SqsModule } from './sqs/sqs.module';
import { SnsModule } from './sns/sns.module';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    LoggerModule.forRootAsync(loggerConfig),
    S3Module,
    SqsModule,
    SnsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
