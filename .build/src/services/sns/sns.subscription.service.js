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
exports.SnsSubscriptionService = void 0;
const common_1 = require("@nestjs/common");
const sns_service_1 = require("./sns.service");
let SnsSubscriptionService = class SnsSubscriptionService {
    constructor(snsService) {
        this.snsService = snsService;
    }
    async onModuleInit() {
        const topicArn = process.env.SNS_TOPIC_ARN;
        const queueArn = process.env.SQS_QUEUE_ARN;
        try {
            const subscriptionArn = await this.snsService.subscribeToTopic(topicArn, queueArn);
            console.log(`Subscribed to SNS topic with SubscriptionArn: ${subscriptionArn}`);
        }
        catch (error) {
            console.error('Error subscribing to SNS topic:', error);
        }
    }
};
exports.SnsSubscriptionService = SnsSubscriptionService;
exports.SnsSubscriptionService = SnsSubscriptionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [sns_service_1.SnsService])
], SnsSubscriptionService);
//# sourceMappingURL=sns.subscription.service.js.map