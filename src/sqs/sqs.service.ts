import * as AWS from 'aws-sdk';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SqsService {
  private sqs: AWS.SQS;

  constructor() {
    this.sqs = new AWS.SQS({
      endpoint: process.env.AWS_ENDPOINT_URL,
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_DEFAULT_REGION,
    });
  }

  async sendMessage(queueUrl: string, message: string): Promise<string> {
    const params = {
      QueueUrl: queueUrl,
      MessageBody: message,
    };

    try {
      const sendMessageResponse = await this.sqs.sendMessage(params).promise();
      return sendMessageResponse.MessageId;
    } catch (error) {
      console.error('Error sending message to SQS:', error);
      throw error;
    }
  }

  async receiveMessages(queueUrl: string, maxMessages = 1): Promise<AWS.SQS.Message[]> {
    const params = {
      QueueUrl: queueUrl,
      MaxNumberOfMessages: maxMessages,
    };

    try {
      const receiveMessageResponse = await this.sqs.receiveMessage(params).promise();
      return receiveMessageResponse.Messages || [];
    } catch (error) {
      console.error('Error receiving messages from SQS:', error);
      throw error;
    }
  }

  async deleteMessage(queueUrl: string, receiptHandle: string): Promise<void> {
    const params = {
      QueueUrl: queueUrl,
      ReceiptHandle: receiptHandle,
    };

    try {
      await this.sqs.deleteMessage(params).promise();
    } catch (error) {
      console.error('Error deleting message from SQS:', error);
      throw error;
    }
  }
}
