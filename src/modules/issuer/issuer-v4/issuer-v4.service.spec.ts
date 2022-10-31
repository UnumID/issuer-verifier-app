import { Test, TestingModule } from '@nestjs/testing';
import { IssuerV4Service } from './issuer-v4.service';

describe('IssuerV4Service', () => {
  let service: IssuerV4Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IssuerV4Service],
    }).compile();

    service = module.get<IssuerV4Service>(IssuerV4Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
