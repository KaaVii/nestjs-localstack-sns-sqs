"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const s3_service_1 = require("./s3.service");
describe('S3Service', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [s3_service_1.S3Service],
        }).compile();
        service = module.get(s3_service_1.S3Service);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=s3.service.spec.js.map