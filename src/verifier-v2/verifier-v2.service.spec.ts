import { Test, TestingModule } from '@nestjs/testing';
import { VerifierV2Service } from './verifier-v2.service';

describe('VerifierV2Service', () => {
  let service: VerifierV2Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VerifierV2Service],
    }).compile();

    service = module.get<VerifierV2Service>(VerifierV2Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
