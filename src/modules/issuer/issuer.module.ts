import { Module } from '@nestjs/common';
import { IssuerV2Service } from 'src/issuer-v2/issuer-v2.service';
import { IssuerV3Service } from 'src/issuer-v3/issuer-v3.service';
import { IssuerController } from './issuer.controller';
import { IssuerService } from './issuer.service';

@Module({
  controllers: [IssuerController],
  providers: [IssuerService, IssuerV2Service, IssuerV3Service]
})
export class IssuerModule {}
