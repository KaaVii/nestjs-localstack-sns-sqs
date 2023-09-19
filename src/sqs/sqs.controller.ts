import { Body, Controller, Get, Post } from '@nestjs/common';
import { SqsService } from './sqs.service';

@Controller('sqs')
export class SqsController {

    constructor(private readonly sqsService: SqsService) {}
    queueUrl: string = process.env.SQS_QUEUE_URL; 
    
    @Post()
    async sendSqsMessage(@Body() body: { message: string }): Promise<string> {
      return this.sqsService.sendMessage(this.queueUrl, body.message);
    }
  
    @Get()
    async receiveSqsMessage(): Promise<AWS.SQS.Message[]> {  
      return this.sqsService.receiveMessages(this.queueUrl);
    }

}

