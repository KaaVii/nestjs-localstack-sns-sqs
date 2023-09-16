"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const sqs_service_1 = require("./sqs.service");
describe('SqsService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [sqs_service_1.SqsService],
        }).compile();
        service = module.get(sqs_service_1.SqsService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=sqs.service.spec.js.map