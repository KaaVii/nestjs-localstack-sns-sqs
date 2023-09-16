"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const sqs_service_1 = require("./services/sqs/sqs.service");
const sns_service_1 = require("./services/sns/sns.service");
const sns_subscription_service_1 = require("./services/sns/sns.subscription.service");
const config_1 = require("@nestjs/config");
const nestjs_pino_1 = require("nestjs-pino");
const s3_service_1 = require("./services/s3/s3.service");
const dynamodb_service_1 = require("./services/dynamodb/dynamodb.service");
const logger_config_1 = require("./common/config/logger.config");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot(),
            nestjs_pino_1.LoggerModule.forRootAsync(logger_config_1.default),
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, sqs_service_1.SqsService, sns_service_1.SnsService, sns_subscription_service_1.SnsSubscriptionService, s3_service_1.S3Service, dynamodb_service_1.DynamodbService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map