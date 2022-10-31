import { Test, TestingModule } from '@nestjs/testing';
import { VerifierV4Service } from './verifier-v4.service';

describe('VerifierV4Service', () => {
  let service: VerifierV4Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VerifierV4Service],
    }).compile();

    service = module.get<VerifierV4Service>(VerifierV4Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
