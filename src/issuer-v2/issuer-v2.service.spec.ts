import { Test, TestingModule } from '@nestjs/testing';
import { IssuerV2Service } from './issuer-v2.service';

describe('IssuerV2Service', () => {
  let service: IssuerV2Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IssuerV2Service],
    }).compile();

    service = module.get<IssuerV2Service>(IssuerV2Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
