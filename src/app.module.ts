import { Module } from '@nestjs/common';
import { CredentialsModule } from './credentials/credentials.module';
import { IssuerModule } from './issuer/issuer.module';

@Module({
  imports: [CredentialsModule, IssuerModule]
})
export class AppModule {}
