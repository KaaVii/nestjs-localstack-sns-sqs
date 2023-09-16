import * as AWS from 'aws-sdk';
export declare class SqsService {
    private sqs;
    constructor();
    sendMessage(queueUrl: string, message: string): Promise<string>;
    receiveMessages(queueUrl: string, maxMessages?: number): Promise<AWS.SQS.Message[]>;
    deleteMessage(queueUrl: string, receiptHandle: string): Promise<void>;
}
