// sns.controller.ts

import { Controller, Post, Body } from '@nestjs/common';
import { SnsService } from './sns.service';

@Controller('sns')
export class SnsController {
  constructor(private readonly snsService: SnsService) {}

  snsArn: string = process.env.SNS_TOPIC_ARN;

  @Post('webhook')
  async handleSnsWebhook(@Body() snsMessage: any): Promise<void> {
    // Handle the SNS message received from AWS SNS
    console.log('Received SNS Message:', snsMessage);

    // Add your custom logic here to process the SNS message

    // Respond with an HTTP status code (e.g., 200) if required
  }

  @Post('publish')
  async publishSnsMessage(@Body() body: { message: string }): Promise<string> {
    return this.snsService.publishMessage(this.snsArn, body.message);
  }
}
