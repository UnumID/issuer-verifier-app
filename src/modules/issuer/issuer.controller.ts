import { Body, Controller, HttpCode, Post, Response, Request, UseGuards } from '@nestjs/common';
import { Response as Res, Request as Req } from 'express';
import { IssuerService } from './issuer.service';
import {
  issueCredential as _issueCredential,
  revokeCredential as _revokeCredential,
  registerIssuer as _registerIssuer,
  IssuerDto,
  RegisteredIssuer
} from '@UnumId/issuer-server-sdk';
import { Credential } from 'library-issuer-verifier-utility/build/types';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('issuer')
@UseGuards(AuthGuard)
export class IssuerController {
  constructor (private issuerService: IssuerService) {}

  // todo and real types to these requests
  @Post('register')
  //   @Header('x-auth-token')
  async register (@Request() req: Req, @Body() dto: any, @Response() res: Res) {
    const result: IssuerDto<RegisteredIssuer> = await this.issuerService.registerIssuer(dto.name, dto.customerUuid, dto.apiKey);
    // todo figure out the more elegant NestJS way of doing this.
    return res.set({ 'x-auth-token': result.authToken }).json(result.body);
  }

  @Post('issueCredential')
  async issueCredential (@Request() req: Req, @Body() dto: any, @Response() res: Res) {
    const auth = req.headers.authorization;
    const result: IssuerDto<Credential> = await this.issuerService.issueCredential(auth, dto.type, dto.issuer, dto.credentialSubject, dto.eccPrivateKey, dto.expirationDate);
    return res.set({ 'x-auth-token': result.authToken }).json(result.body);
  }

  @Post('revokeCredential')
  @HttpCode(200)
  async revokeCredential (@Request() req: Req, @Body() dto: any, @Response() res: Res) {
    const auth = req.headers.authorization;
    const result: IssuerDto<Credential> = await this.issuerService.revokeCredential(auth, dto.credentialId);
    return res.set({ 'x-auth-token': result.authToken }).json(result.body);
  }
}
