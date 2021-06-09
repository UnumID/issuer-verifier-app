import { Test, TestingModule } from '@nestjs/testing';
import { IssuerV3Service } from './issuer-v3.service';

describe('IssuerV3Service', () => {
  let service: IssuerV3Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IssuerV3Service],
    }).compile();

    service = module.get<IssuerV3Service>(IssuerV3Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
