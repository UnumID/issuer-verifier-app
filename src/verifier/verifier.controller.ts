import { Body, Controller, Post, Response } from '@nestjs/common';
import { VerifierService } from './verifier.service';
import { Response as Res } from 'express';
import {
  Receipt,
  PresentationRequestResponse,
  VerifierDto,
  RegisteredVerifier
} from '@UnumId/verifier-server-sdk';

@Controller('verifier')
export class VerifierController {
  constructor (private verifierService: VerifierService) {}

  // todo and real types to these requests
  @Post('register')
  async register (@Body() dto: any, @Response() res: Res) {
    const result: VerifierDto<RegisteredVerifier> = await this.verifierService.registerVerifier(dto.name, dto.customerUuid, dto.url, dto.apiKey);
    // todo figure out the more elegant NestJS way of doing this.
    return res.set({ 'x-auth-token': result.authToken }).json(result.body);
  }

  @Post('sendEmail')
  async sendEmail (@Body() dto: any, @Response() res: Res) {
    const result: VerifierDto = await this.verifierService.sendEmail(dto.authorization, dto.to, dto.subject, dto.textBody, dto.htmlBody);
    return res.set({ 'x-auth-token': result.authToken }).json(result.body);
  }

  @Post('sendSms')
  async sendSms (@Body() dto: any, @Response() res: Res) {
    const result: VerifierDto = await this.verifierService.sendSms(dto.authorization, dto.to, dto.msg);
    return res.set({ 'x-auth-token': result.authToken }).json(result.body);
  }

  @Post('sendRequest')
  async sendRequest (@Body() dto: any, @Response() res: Res) {
    const result: VerifierDto<PresentationRequestResponse> = await this.verifierService.sendRequest(dto.authorization, dto.verifier, dto.credentialRequests, dto.eccPrivateKey, dto.holderAppUuid);
    return res.set({ 'x-auth-token': result.authToken }).json(result.body);
  }

  @Post('verifyNoPresentation')
  async verifyNoPresentation (@Body() dto: any, @Response() res: Res) {
    const result: VerifierDto<Receipt> = await this.verifierService.verifyNoPresentation(dto.authorization, dto.noPresentation, dto.verifier);
    return res.set({ 'x-auth-token': result.authToken }).json(result.body);
  }

  @Post('verifyPresentation')
  async verifyPresentation (@Body() dto: any, @Response() res: Res) {
    const result: VerifierDto<Receipt> = await this.verifierService.verifyPresentation(dto.authorization, dto.presentation, dto.verifier);
    return res.set({ 'x-auth-token': result.authToken }).json(result.body);
  }
}
