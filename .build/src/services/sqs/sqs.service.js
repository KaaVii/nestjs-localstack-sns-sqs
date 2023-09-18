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
exports.SqsService = void 0;
const AWS = require("aws-sdk");
const common_1 = require("@nestjs/common");
let SqsService = class SqsService {
    constructor() {
        this.sqs = new AWS.SQS({
            endpoint: 'http://localhost:4566',
            accessKeyId: 'your-access-key-id',
            secretAccessKey: 'your-secret-access-key',
            region: 'us-east-1',
        });
    }
    async sendMessage(queueUrl, message) {
        const params = {
            QueueUrl: queueUrl,
            MessageBody: message,
        };
        try {
            const sendMessageResponse = await this.sqs.sendMessage(params).promise();
            return sendMessageResponse.MessageId;
        }
        catch (error) {
            console.error('Error sending message to SQS:', error);
            throw error;
        }
    }
    async receiveMessages(queueUrl, maxMessages = 1) {
        const params = {
            QueueUrl: queueUrl,
            MaxNumberOfMessages: maxMessages,
        };
        try {
            const receiveMessageResponse = await this.sqs.receiveMessage(params).promise();
            return receiveMessageResponse.Messages || [];
        }
        catch (error) {
            console.error('Error receiving messages from SQS:', error);
            throw error;
        }
    }
    async deleteMessage(queueUrl, receiptHandle) {
        const params = {
            QueueUrl: queueUrl,
            ReceiptHandle: receiptHandle,
        };
        try {
            await this.sqs.deleteMessage(params).promise();
        }
        catch (error) {
            console.error('Error deleting message from SQS:', error);
            throw error;
        }
    }
};
exports.SqsService = SqsService;
exports.SqsService = SqsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], SqsService);
//# sourceMappingURL=sqs.service.js.map