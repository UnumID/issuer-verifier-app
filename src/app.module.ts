import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { AuthGuard } from './guards/auth.guard';
import { VersionGuard } from './guards/version.guard';
import { HealthModule } from './modules/health/health.module';
import { IssuerModule } from './modules/issuer/issuer.module';
import { VerifierModule } from './modules/verifier/verifier.module';
import { VerifierV2Service } from './verifier-v2/verifier-v2.service';
import { IssuerV2Service } from './issuer-v2/issuer-v2.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    IssuerModule,
    VerifierModule,
    HealthModule],
  providers: [AuthGuard, VersionGuard, VerifierV2Service, IssuerV2Service]
})
export class AppModule {}
