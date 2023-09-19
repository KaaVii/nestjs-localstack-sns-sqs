import { Test, TestingModule } from '@nestjs/testing';
import { SnsService } from 'src/sns/sns.service';

describe('SnsService', () => {
  let service: SnsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SnsService],
    }).compile();

    service = module.get<SnsService>(SnsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
