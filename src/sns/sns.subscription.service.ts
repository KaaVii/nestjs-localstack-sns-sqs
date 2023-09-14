// sns-subscription.service.ts

import { Injectable, OnModuleInit } from '@nestjs/common';
import { SnsService } from './sns.service';

@Injectable()
export class SnsSubscriptionService implements OnModuleInit {
  constructor(private readonly snsService: SnsService) {}

  async onModuleInit() {
    const topicArn = 'arn:aws:sns:us-east-1:000000000000:my-topic';
    const queueArn = 'arn:aws:sqs:us-east-1:000000000000:my-queue';

    try {
      const subscriptionArn = await this.snsService.subscribeToTopic(topicArn, queueArn);
      console.log(`Subscribed to SNS topic with SubscriptionArn: ${subscriptionArn}`);
    } catch (error) {
      console.error('Error subscribing to SNS topic:', error);
    }
  }
}
