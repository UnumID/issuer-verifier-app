import { Body, Controller, Post, Response, Request, UseGuards } from '@nestjs/common';
import { VerifierService } from './verifier.service';
import { Response as Res, Request as Req } from 'express';
import {
  Receipt,
  PresentationRequestResponse,
  VerifierDto,
  RegisteredVerifier
} from '@unumid/verifier-server-sdk';
import { AuthGuard } from '../../../src/guards/auth.guard';

@Controller('verifier/api')
export class VerifierController {
  constructor (private verifierService: VerifierService) {}

  // todo and real types to these requests
  @Post('register')
  async register (@Request() req: Req, @Body() dto: any, @Response() res: Res) {
    const result: VerifierDto<RegisteredVerifier> = await this.verifierService.registerVerifier(dto.name, dto.customerUuid, dto.url, dto.apiKey);
    // todo figure out the more elegant NestJS way of doing this.
    return res.set({ 'x-auth-token': result.authToken }).json(result.body);
  }

  @Post('sendEmail')
  @UseGuards(AuthGuard)
  async sendEmail (@Request() req: Req, @Body() dto: any, @Response() res: Res) {
    const auth = req.headers.authorization;

    const result: VerifierDto = await this.verifierService.sendEmail(auth, dto.to, dto.subject, dto.textBody, dto.htmlBody);

    return res.set({ 'x-auth-token': result.authToken }).json(result.body);
  }

  @Post('sendSms')
  @UseGuards(AuthGuard)
  async sendSms (@Request() req: Req, @Body() dto: any, @Response() res: Res) {
    const auth = req.headers.authorization;
    const result: VerifierDto = await this.verifierService.sendSms(auth, dto.to, dto.msg);
    return res.set({ 'x-auth-token': result.authToken }).json(result.body);
  }

  @Post('sendRequest')
  @UseGuards(AuthGuard)
  async sendRequest (@Request() req: Req, @Body() dto: any, @Response() res: Res) {
    const auth = req.headers.authorization;
    const result: VerifierDto<PresentationRequestResponse> = await this.verifierService.sendRequest(auth, dto.verifier, dto.credentialRequests, dto.eccPrivateKey, dto.holderAppUuid);
    return res.set({ 'x-auth-token': result.authToken }).json(result.body);
  }

  @Post('verifyNoPresentation')
  @UseGuards(AuthGuard)
  async verifyNoPresentation (@Request() req: Req, @Body() dto: any, @Response() res: Res) {
    const auth = req.headers.authorization;
    const result: VerifierDto<Receipt> = await this.verifierService.verifyNoPresentation(auth, dto.noPresentation, dto.verifier);
    return res.set({ 'x-auth-token': result.authToken }).json(result.body);
  }

  @Post('verifyPresentation')
  @UseGuards(AuthGuard)
  async verifyPresentation (@Request() req: Req, @Body() dto: any, @Response() res: Res) {
    const auth = req.headers.authorization;
    const result: VerifierDto<Receipt> = await this.verifierService.verifyPresentation(auth, dto.presentation, dto.verifier);
    return res.set({ 'x-auth-token': result.authToken }).json(result.body);
  }

  @Post('verifyEncryptedPresentation')
  @UseGuards(AuthGuard)
  async verifyEncryptedPresentation (@Request() req: Req, @Body() dto: any, @Response() res: Res) {
    const auth = req.headers.authorization;
    const result: VerifierDto<Receipt> = await this.verifierService.verifyEncryptedPresentation(auth, dto.encryptedPresentation, dto.verifier, dto.encryptionPrivateKey);
    return res.set({ 'x-auth-token': result.authToken }).json(result.body);
  }
}
