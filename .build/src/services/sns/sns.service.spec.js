"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const sns_service_1 = require("./sns.service");
describe('SnsService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [sns_service_1.SnsService],
        }).compile();
        service = module.get(sns_service_1.SnsService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=sns.service.spec.js.map