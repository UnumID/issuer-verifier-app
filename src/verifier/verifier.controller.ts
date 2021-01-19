import { Body, Controller, Post } from '@nestjs/common';
import { VerifierService } from './verifier.service';

@Controller('verifier')
export class VerifierController {
  constructor (private verifierService: VerifierService) {}

  // todo and real types to these requests
  @Post('register')
  async register (@Body() dto: any) {
    return await this.verifierService.registerVerifier(dto.name, dto.customerUuid, dto.url, dto.apiKey);
  }

  @Post('sendEmail')
  async sendEmail (@Body() dto: any) {
    return await this.verifierService.sendEmail(dto.authorization, dto.to, dto.subject, dto.textBody, dto.htmlBody);
  }

  @Post('sendSms')
  async sendSms (@Body() dto: any) {
    return await this.verifierService.sendSms(dto.authorization, dto.to, dto.msg);
  }

  @Post('sendRequest')
  async sendRequest (@Body() dto: any) {
    return await this.verifierService.sendRequest(dto.authorization, dto.verifier, dto.credentialRequests, dto.eccPrivateKey, dto.holderAppUuid);
  }

  @Post('verifyNoPresentation')
  async verifyNoPresentation (@Body() dto: any) {
    return await this.verifierService.verifyNoPresentation(dto.authorization, dto.noPresentation, dto.verifier);
  }

  @Post('verifyPresentation')
  async verifyPresentation (@Body() dto: any) {
    return await this.verifierService.verifyPresentation(dto.authorization, dto.presentation, dto.verifier);
  }
}
