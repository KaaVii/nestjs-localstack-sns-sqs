export declare class SnsService {
    private sns;
    constructor();
    publishMessage(topicArn: string, message: string): Promise<string>;
    subscribeToTopic(topicArn: string, queueArn: string): Promise<string>;
}
