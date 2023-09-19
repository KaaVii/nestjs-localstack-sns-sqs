import { Module } from '@nestjs/common';
import { SnsService } from './sns.service';
import { SnsController } from './sns.controller';
import { SnsSubscriptionService } from './sns.subscription.service';

@Module({
  providers: [SnsService, SnsSubscriptionService],
  exports: [SnsService],
  controllers: [SnsController]
})
export class SnsModule {}
