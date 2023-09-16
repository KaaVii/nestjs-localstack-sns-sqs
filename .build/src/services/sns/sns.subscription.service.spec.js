"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const sns_subscription_service_1 = require("./sns.subscription.service");
const sns_service_1 = require("./sns.service");
class SnsServiceMock {
    subscribeToTopic() {
        return Promise.resolve('mocked-subscription-arn');
    }
}
describe('SnsSubscriptionService', () => {
    let snsSubscriptionService;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [
                sns_subscription_service_1.SnsSubscriptionService,
                {
                    provide: sns_service_1.SnsService,
                    useClass: SnsServiceMock,
                },
            ],
        }).compile();
        snsSubscriptionService = module.get(sns_subscription_service_1.SnsSubscriptionService);
    });
    it('should be defined', () => {
        expect(snsSubscriptionService).toBeDefined();
    });
    it('should subscribe to SNS topic and log the subscription ARN', async () => {
        const consoleLogSpy = jest.spyOn(console, 'log');
        const consoleErrorSpy = jest.spyOn(console, 'error');
        const result = await snsSubscriptionService.onModuleInit();
        expect(result).toBe('mocked-subscription-arn');
        expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('Subscribed to SNS topic'));
        expect(consoleErrorSpy).not.toHaveBeenCalled();
    });
});
//# sourceMappingURL=sns.subscription.service.spec.js.map