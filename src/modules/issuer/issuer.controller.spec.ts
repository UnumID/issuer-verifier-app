import { Test, TestingModule } from '@nestjs/testing';
import { IssuerV2Service } from '../../issuer-v2/issuer-v2.service';
import { IssuerController } from './issuer.controller';
import { IssuerService } from './issuer.service';

describe('IssuerController', () => {
  let controller: IssuerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IssuerController],
      providers: [IssuerService, IssuerV2Service]
    }).compile();

    controller = module.get<IssuerController>(IssuerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
