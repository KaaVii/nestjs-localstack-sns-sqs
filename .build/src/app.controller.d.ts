import { AppService } from './app.service';
import { SnsService } from './services/sns/sns.service';
import { SqsService } from './services/sqs/sqs.service';
export declare class AppController {
    private readonly appService;
    private readonly sqsService;
    private readonly snsService;
    constructor(appService: AppService, sqsService: SqsService, snsService: SnsService);
    queueUrl: string;
    snsArn: string;
    getHello(): string;
    sendSqsMessage(body: {
        message: string;
    }): Promise<string>;
    receiveSqsMessage(): Promise<AWS.SQS.Message[]>;
    publishSnsMessage(body: {
        message: string;
    }): Promise<string>;
}
