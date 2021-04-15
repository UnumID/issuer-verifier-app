import { Body, Controller, Post, Response, Request, UseGuards } from '@nestjs/common';
import { VerifierService } from './verifier.service';
import { Response as Res, Request as Req } from 'express';
import {
  UnumDto,
  RegisteredVerifier
} from '@unumid/server-sdk';
import { AuthGuard } from '../../guards/auth.guard';
import { DecryptedPresentation } from '@unumid/server-sdk/build/types';
import { PresentationRequestPostDto } from '@unumid/types';

@Controller('verifier/api')
export class VerifierController {
  constructor (private verifierService: VerifierService) {}

  // todo and real types to these requests
  @Post('register')
  async register (@Request() req: Req, @Body() dto: any, @Response() res: Res) {
    try {
      const result: UnumDto<RegisteredVerifier> = await this.verifierService.registerVerifier(dto.name, dto.customerUuid, dto.url, dto.apiKey);
      // todo figure out the more elegant NestJS way of doing this.
      return res.set({ 'x-auth-token': result.authToken }).json(result.body);
    } catch (error) {
      res.status(400);
      return res.json(error);
    }
  }

  @Post('sendEmail')
  @UseGuards(AuthGuard)
  async sendEmail (@Request() req: Req, @Body() dto: any, @Response() res: Res) {
    try {
      const auth = req.headers.authorization;
      const result: UnumDto = await this.verifierService.sendEmail(auth, dto.to, dto.deeplink);
      return res.set({ 'x-auth-token': result.authToken }).json(result.body);
    } catch (error) {
      res.status(400);
      return res.json(error);
    }
  }

  @Post('sendSms')
  @UseGuards(AuthGuard)
  async sendSms (@Request() req: Req, @Body() dto: any, @Response() res: Res) {
    try {
      const auth = req.headers.authorization;
      const result: UnumDto = await this.verifierService.sendSms(auth, dto.to, dto.msg);
      return res.set({ 'x-auth-token': result.authToken }).json(result.body);
    } catch (error) {
      res.status(400);
      return res.json(error);
    }
  }

  @Post('sendRequest')
  @UseGuards(AuthGuard)
  async sendRequest (@Request() req: Req, @Body() dto: any, @Response() res: Res) {
    try {
      const auth = req.headers.authorization;
      const result: UnumDto<PresentationRequestPostDto> = await this.verifierService.sendRequest(auth, dto.verifier, dto.credentialRequests, dto.eccPrivateKey, dto.holderAppUuid, dto.expirationDate, dto.metadata);
      return res.set({ 'x-auth-token': result.authToken }).json(result.body);
    } catch (error) {
      res.status(400);
      return res.json(error);
    }
  }

  @Post('verifyPresentation')
  @UseGuards(AuthGuard)
  async verifyEncryptedPresentation (@Request() req: Req, @Body() dto: any, @Response() res: Res) {
    try {
      const auth = req.headers.authorization;
      const result: UnumDto<DecryptedPresentation> = await this.verifierService.verifyPresentation(auth, dto.encryptedPresentation, dto.verifier, dto.encryptionPrivateKey, dto.presentationRequest);
      return res.set({ 'x-auth-token': result.authToken }).json(result.body);
    } catch (error) {
      res.status(400);
      return res.json(error);
    }
  }
}
