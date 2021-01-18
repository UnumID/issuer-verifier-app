import { Module } from '@nestjs/common';
import { IssuerModule } from './issuer/issuer.module';

@Module({
  imports: [IssuerModule]
})
export class AppModule {}
