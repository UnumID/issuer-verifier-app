import { Body, Controller, HttpCode, Post, Response, Request, UseGuards, Logger } from '@nestjs/common';
import { Response as Res, Request as Req } from 'express';
import { IssuerService } from './issuer.service';
import {
  UnumDto,
  RegisteredIssuer
} from '@unumid/server-sdk';
import { Credential } from '@unumid/library-issuer-verifier-utility/build/types';
import { AuthGuard } from '../../guards/auth.guard';

@Controller('issuer/api')
export class IssuerController {
  constructor (private issuerService: IssuerService) {}

  // todo and real types to these requests
  @Post('register')
  //   @Header('x-auth-token')
  async register (@Request() req: Req, @Body() dto: any, @Response() res: Res) {
    try {
      const result: UnumDto<RegisteredIssuer> = await this.issuerService.registerIssuer(dto.name, dto.customerUuid, dto.apiKey);
      // todo figure out the more elegant NestJS way of doing this.
      return res.set({ 'x-auth-token': result.authToken }).json(result.body);
    } catch (error) {
      res.status(400);
      return res.json(error);
    }
  }

  @Post('issueCredential')
  @UseGuards(AuthGuard)
  async issueCredential (@Request() req: Req, @Body() dto: any, @Response() res: Res) {
    try {
      const auth = req.headers.authorization;
      const result: UnumDto<Credential> = await this.issuerService.issueCredential(auth, dto.type, dto.issuer, dto.credentialSubject, dto.eccPrivateKey, dto.expirationDate);
      return res.set({ 'x-auth-token': result.authToken }).json(result.body);
    } catch (error) {
      res.status(400);
      return res.json(error);
    }
  }

  @Post('revokeCredential')
  @UseGuards(AuthGuard)
  @HttpCode(200)
  async revokeCredential (@Request() req: Req, @Body() dto: any, @Response() res: Res) {
    try {
      const auth = req.headers.authorization;
      const result: UnumDto<Credential> = await this.issuerService.revokeCredential(auth, dto.credentialId);
      return res.set({ 'x-auth-token': result.authToken }).json(result.body);
    } catch (error) {
      res.status(400);
      return res.json(error);
    }
  }
}
