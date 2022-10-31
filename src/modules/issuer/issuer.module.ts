import { Module } from '@nestjs/common';
import { IssuerV2Service } from './issuer-v2/issuer-v2.service';
import { IssuerV3Service } from 'src/modules/issuer/issuer-v3/issuer-v3.service';
import { IssuerController } from './issuer.controller';
import { IssuerService } from './issuer.service';
import { IssuerV4Service } from './issuer-v4/issuer-v4.service';

@Module({
  controllers: [IssuerController],
  providers: [IssuerService, IssuerV2Service, IssuerV3Service, IssuerV4Service]
})
export class IssuerModule {}
