import { Test, TestingModule } from '@nestjs/testing';
import { VerifierV2Service } from '../../verifier-v2/verifier-v2.service';
import { VerifierController } from './verifier.controller';
import { VerifierService } from './verifier.service';

describe('VerifierController', () => {
  let controller: VerifierController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VerifierController],
      providers: [VerifierService, VerifierV2Service]
    }).compile();

    controller = module.get<VerifierController>(VerifierController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
