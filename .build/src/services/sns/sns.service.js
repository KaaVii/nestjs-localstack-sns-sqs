"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SnsService = void 0;
const AWS = require("aws-sdk");
const common_1 = require("@nestjs/common");
let SnsService = class SnsService {
    constructor() {
        this.sns = new AWS.SNS({
            endpoint: 'http://localhost:4566',
            accessKeyId: 'your-access-key-id',
            secretAccessKey: 'your-secret-access-key',
            region: 'us-east-1',
        });
    }
    async publishMessage(topicArn, message) {
        const params = {
            TopicArn: topicArn,
            Message: message,
        };
        try {
            const publishResponse = await this.sns.publish(params).promise();
            return publishResponse.MessageId;
        }
        catch (error) {
            console.error('Error publishing message to SNS:', error);
            throw error;
        }
    }
    async subscribeToTopic(topicArn, queueArn) {
        const params = {
            Protocol: 'sqs',
            TopicArn: topicArn,
            Endpoint: queueArn,
        };
        try {
            const subscribeResponse = await this.sns.subscribe(params).promise();
            return subscribeResponse.SubscriptionArn;
        }
        catch (error) {
            console.error('Error subscribing to SNS topic:', error);
            throw error;
        }
    }
};
exports.SnsService = SnsService;
exports.SnsService = SnsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], SnsService);
//# sourceMappingURL=sns.service.js.map