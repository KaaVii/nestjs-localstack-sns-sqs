import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AwsConfigService } from './aws.config';
import { LoggerModule } from 'nestjs-pino';
import loggerConfig from './logger.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    LoggerModule.forRootAsync(loggerConfig),
  ],
  providers: [AwsConfigService],
  exports: [AwsConfigService],
})
export class Settings {}
