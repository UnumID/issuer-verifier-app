import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { HealthModule } from './modules/health/health.module';
import { IssuerModule } from './modules/issuer/issuer.module';
import { VerifierModule } from './modules/verifier/verifier.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    IssuerModule,
    VerifierModule,
    HealthModule]
})
export class AppModule {}
