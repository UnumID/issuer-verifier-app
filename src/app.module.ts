import { Module } from '@nestjs/common';
import { HealthModule } from './health/health.module';
import { IssuerModule } from './issuer/issuer.module';
import { VerifierModule } from './verifier/verifier.module';

@Module({
  imports: [IssuerModule, VerifierModule, HealthModule]
})
export class AppModule {}
