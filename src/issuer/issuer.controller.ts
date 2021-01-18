import { Body, Controller, Post } from '@nestjs/common';
import { IssuerService } from './issuer.service';

@Controller('issuer')
export class IssuerController {
  constructor (private issuerService: IssuerService) {}

  @Post('issueCredential')
  async issueCredential (@Body() dto: any) {
    return await this.issuerService.issueCredential(dto.authorization, dto.type, dto.issuer, dto.credentialSubject, dto.eccPrivateKey, dto.expirationDate);
  }

  @Post('revokeCredential')
  async revokeCredential (@Body() dto: any) {
    return await this.issuerService.revokeCredential(dto.authorization, dto.credentialId);
  }
}
