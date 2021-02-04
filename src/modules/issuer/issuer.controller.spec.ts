import { Test, TestingModule } from '@nestjs/testing';
import { IssuerController } from './issuer.controller';
import { IssuerService } from './issuer.service';

describe('IssuerController', () => {
  let controller: IssuerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IssuerController],
      providers: [IssuerService]
    }).compile();

    controller = module.get<IssuerController>(IssuerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
