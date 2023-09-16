import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { SnsService } from './services/sns/sns.service';
import { SqsService } from './services/sqs/sqs.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly sqsService: SqsService,
    private readonly snsService: SnsService,
    ) {}

  queueUrl: string = process.env.SQS_QUEUE_URL; 
  snsArn: string = process.env.SNS_TOPIC_ARN;

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/sqs')
  async sendSqsMessage(@Body() body: { message: string }): Promise<string> {
    return this.sqsService.sendMessage(this.queueUrl, body.message);
  }

  @Get('/sqs')
  async receiveSqsMessage(): Promise<AWS.SQS.Message[]> {  
    return this.sqsService.receiveMessages(this.queueUrl);
  }

  @Post('/sns')
  async publishSnsMessage(@Body() body: { message: string }): Promise<string> {
    return this.snsService.publishMessage(this.snsArn, body.message);
  }
}
