// sns-subscription.service.spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { SnsSubscriptionService } from './sns.subscription.service';
import { SnsService } from './sns.service';

// Mock SnsService to avoid actual AWS SDK calls during testing
class SnsServiceMock {
  subscribeToTopic() {
    // Mock implementation of subscribeToTopic method
    return Promise.resolve('mocked-subscription-arn');
  }
}

describe('SnsSubscriptionService', () => {
  let snsSubscriptionService: SnsSubscriptionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SnsSubscriptionService,
        // Provide the mocked SnsService
        {
          provide: SnsService,
          useClass: SnsServiceMock,
        },
      ],
    }).compile();

    snsSubscriptionService = module.get<SnsSubscriptionService>(SnsSubscriptionService);
  });

  it('should be defined', () => {
    expect(snsSubscriptionService).toBeDefined();
  });

  it('should subscribe to SNS topic and log the subscription ARN', async () => {

    // Spy on console.log and console.error to capture log messages
    const consoleLogSpy = jest.spyOn(console, 'log');
    const consoleErrorSpy = jest.spyOn(console, 'error');

    const result = await snsSubscriptionService.onModuleInit();

    // Expect the SnsService's subscribeToTopic method to be called with the provided ARNs
    expect(result).toBe('mocked-subscription-arn'); // Mocked subscription ARN

    // Expect that a success message is logged
    expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('Subscribed to SNS topic'));

    // Expect that there are no error messages logged
    expect(consoleErrorSpy).not.toHaveBeenCalled();
  });
});
