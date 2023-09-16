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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
const sns_service_1 = require("./services/sns/sns.service");
const sqs_service_1 = require("./services/sqs/sqs.service");
let AppController = class AppController {
    constructor(appService, sqsService, snsService) {
        this.appService = appService;
        this.sqsService = sqsService;
        this.snsService = snsService;
        this.queueUrl = process.env.SQS_QUEUE_URL;
        this.snsArn = process.env.SNS_TOPIC_ARN;
    }
    getHello() {
        return this.appService.getHello();
    }
    async sendSqsMessage(body) {
        return this.sqsService.sendMessage(this.queueUrl, body.message);
    }
    async receiveSqsMessage() {
        return this.sqsService.receiveMessages(this.queueUrl);
    }
    async publishSnsMessage(body) {
        return this.snsService.publishMessage(this.snsArn, body.message);
    }
};
exports.AppController = AppController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "getHello", null);
__decorate([
    (0, common_1.Post)('/sqs'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "sendSqsMessage", null);
__decorate([
    (0, common_1.Get)('/sqs'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "receiveSqsMessage", null);
__decorate([
    (0, common_1.Post)('/sns'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "publishSnsMessage", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [app_service_1.AppService,
        sqs_service_1.SqsService,
        sns_service_1.SnsService])
], AppController);
//# sourceMappingURL=app.controller.js.map