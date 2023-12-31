import * as AWS from 'aws-sdk';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SnsService {
  private sns: AWS.SNS;

  constructor() {
    /* localstack sample config */
    this.sns = new AWS.SNS({
      endpoint: process.env.AWS_ENDPOINT, // Use a valid endpoint for LocalStack
      accessKeyId: process.env.AWS_ACCESS_KEY_ID, // Use a valid access key for LocalStack  
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY, // Use a valid secret key for LocalStack
      region: process.env.AWS_DEFAULT_REGION,
    });
  }

  async publishMessage(topicArn: string, message: string): Promise<string> {
    const params = {
      TopicArn: topicArn,
      Message: message,
    };

    try {
      const publishResponse = await this.sns.publish(params).promise();
      return publishResponse.MessageId;
    } catch (error) {
      console.error('Error publishing message to SNS:', error);
      throw error;
    }
  }

  async subscribeToTopic(topicArn: string, queueArn: string): Promise<string> {
    const params = {
      Protocol: 'sqs',
      TopicArn: topicArn,
      Endpoint: queueArn,
    };

    try {
      const subscribeResponse = await this.sns.subscribe(params).promise();
      return subscribeResponse.SubscriptionArn; 
    } catch (error) {
      console.error('Error subscribing to SNS topic:', error);
      throw error;
    }
  }
}
