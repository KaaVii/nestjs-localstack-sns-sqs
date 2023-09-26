// sns-subscription.service.ts

import { Injectable, OnModuleInit } from '@nestjs/common';
import { SnsService } from './sns.service';

@Injectable()
export class SnsSubscriptionService implements OnModuleInit {
  constructor(private readonly snsService: SnsService) { }

  async onModuleInit() {
    if (process.env.APP_ENV === 'dev') {
      const topicArn = process.env.SNS_TOPIC_ARN;
      const queueArn = process.env.SQS_QUEUE_ARN;

      try {
        const subscriptionArn = await this.snsService.subscribeToTopic(topicArn, queueArn);
        console.log(`Subscribed to SNS topic with SubscriptionArn: ${subscriptionArn}`);
      } catch (error) {
        console.error('Error subscribing to SNS topic:', error);
        console.error('topicArn:', topicArn);
        console.error('queueArn:', queueArn);
      }
    }
  }
}
