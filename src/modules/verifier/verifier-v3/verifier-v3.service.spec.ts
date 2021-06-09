import { Test, TestingModule } from '@nestjs/testing';
import { VerifierV3Service } from './verifier-v3.service';

describe('VerifierV3Service', () => {
  let service: VerifierV3Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VerifierV3Service],
    }).compile();

    service = module.get<VerifierV3Service>(VerifierV3Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
