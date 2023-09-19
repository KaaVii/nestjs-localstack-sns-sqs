import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AwsConfigService } from './aws.config';
import { LoggerModule } from 'nestjs-pino';
import loggerConfig from './logger.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Make the configuration service global
    }),
    LoggerModule.forRootAsync(loggerConfig),
  ],
  providers: [AwsConfigService],
  exports: [AwsConfigService], // Export the ConfigService for injection in other modules
})
export class Settings {}
