"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const dynamodb_service_1 = require("./dynamodb.service");
describe('DynamodbService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [dynamodb_service_1.DynamodbService],
        }).compile();
        service = module.get(dynamodb_service_1.DynamodbService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=dynamodb.service.spec.js.map