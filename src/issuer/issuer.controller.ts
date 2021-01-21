import { Body, Controller, Header, Post } from '@nestjs/common';
import { IssuerService } from './issuer.service';
import {
  issueCredential as _issueCredential,
  revokeCredential as _revokeCredential,
  registerIssuer as _registerIssuer,
  IssuerDto,
  RegisteredIssuer
} from '@UnumId/issuer-server-sdk';
@Controller('issuer')
export class IssuerController {
  constructor (private issuerService: IssuerService) {}

  // todo and real types to these requests
  @Post('register')
  @Header('x-auth-token')
  async register (@Body() dto: any) {
    const res: IssuerDto<RegisteredIssuer> = await this.issuerService.registerIssuer(dto.name, dto.customerUuid, dto.apiKey);
    const authToken = res.authToken;
  }

  @Post('issueCredential')
  async issueCredential (@Body() dto: any) {
    return await this.issuerService.issueCredential(dto.authorization, dto.type, dto.issuer, dto.credentialSubject, dto.eccPrivateKey, dto.expirationDate);
  }

  @Post('revokeCredential')
  async revokeCredential (@Body() dto: any) {
    return await this.issuerService.revokeCredential(dto.authorization, dto.credentialId);
  }
}
