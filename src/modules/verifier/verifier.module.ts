import { Module } from '@nestjs/common';
import { VerifierService } from './verifier.service';
import { VerifierController } from './verifier.controller';
import { VerifierV2Service } from 'src/verifier-v2/verifier-v2.service';

@Module({
  providers: [VerifierService, VerifierV2Service],
  controllers: [VerifierController]
})
export class VerifierModule {}
