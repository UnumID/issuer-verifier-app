import { Body, Controller, Post, Response, Request, UseGuards } from '@nestjs/common';
import { VerifierService } from './verifier.service';
import { Response as Res, Request as Req } from 'express';
import { AuthGuard } from '../../guards/auth.guard';
import { VersionGuard } from '../../guards/version.guard';
import { lt } from 'semver';
import { VerifierV2Service } from './verifier-v2/verifier-v2.service';
import { VerifierV3Service } from './verifier-v3/verifier-v3.service';

@UseGuards(VersionGuard)
@Controller('verifier/api')
export class VerifierController {
  constructor (private verifierService: VerifierService, private verifierV2Service: VerifierV2Service, private verifierV3Service: VerifierV3Service) {}

  // todo and real types to these requests
  @Post('register')
  async register (@Request() req: Req, @Body() dto: any, @Response() res: Res) {
    try {
      let result;
      if (lt(req.headers.version as string, '2.0.0')) {
        result = await this.verifierService.registerVerifier(dto.name, dto.customerUuid, dto.url, dto.apiKey);
      } else if (lt(req.headers.version as string, '3.0.0')) {
        result = await this.verifierV2Service.registerVerifier(dto.name, dto.customerUuid, dto.url, dto.apiKey);
      } else {
        result = await this.verifierV3Service.registerVerifier(dto.customerUuid, dto.url, dto.apiKey);
      }

      // todo figure out the more elegant NestJS way of doing this.
      return res.set({ 'x-auth-token': result.authToken }).json(result.body);
    } catch (error) {
      if (error.name === 'CustError') {
        res.status(error.code);
        return res.json({
          name: 'CustomError',
          message: error.message
        });
      }

      res.status(400);
      return res.json(error);
    }
  }

  @Post('sendEmail')
  @UseGuards(AuthGuard)
  async sendEmail (@Request() req: Req, @Body() dto: any, @Response() res: Res) {
    try {
      const auth = req.headers.authorization;

      let result;
      if (lt(req.headers.version as string, '2.0.0')) {
        result = await this.verifierService.sendEmail(auth, dto.to, dto.deeplink);
      } else if (lt(req.headers.version as string, '3.0.0')) {
        result = await this.verifierV2Service.sendEmail(auth, dto.to, dto.deeplink);
      } else {
        result = await this.verifierV3Service.sendEmail(auth, dto.to, dto.deeplink);
      }

      return res.set({ 'x-auth-token': result.authToken }).json(result.body);
    } catch (error) {
      if (error.name === 'CustError') {
        res.status(error.code);
        return res.json({
          name: 'CustomError',
          message: error.message
        });
      }

      res.status(400);
      return res.json(error);
    }
  }

  @Post('sendSms')
  @UseGuards(AuthGuard)
  async sendSms (@Request() req: Req, @Body() dto: any, @Response() res: Res) {
    try {
      const auth = req.headers.authorization;

      let result;
      if (lt(req.headers.version as string, '2.0.0')) {
        result = await this.verifierService.sendSms(auth, dto.to, dto.deeplink);
      } else if (lt(req.headers.version as string, '3.0.0')) {
        result = await this.verifierV2Service.sendSms(auth, dto.to, dto.deeplink);
      } else {
        result = await this.verifierV3Service.sendSms(auth, dto.to, dto.deeplink);
      }

      return res.set({ 'x-auth-token': result.authToken }).json(result.body);
    } catch (error) {
      if (error.name === 'CustError') {
        res.status(error.code);
        return res.json({
          name: 'CustomError',
          message: error.message
        });
      }

      res.status(400);
      return res.json(error);
    }
  }

  @Post('sendRequest')
  @UseGuards(AuthGuard)
  async sendRequest (@Request() req: Req, @Body() dto: any, @Response() res: Res) {
    try {
      const auth = req.headers.authorization;

      let result;
      if (lt(req.headers.version as string, '2.0.0')) {
        result = await this.verifierService.sendRequest(auth, dto.verifier, dto.credentialRequests, dto.eccPrivateKey, dto.holderAppUuid, dto.expirationDate, dto.metadata);
      } else if (lt(req.headers.version as string, '3.0.0')) {
        result = await this.verifierV2Service.sendRequest(auth, dto.verifier, dto.credentialRequests, dto.eccPrivateKey, dto.holderAppUuid, dto.expirationDate, dto.metadata);
      } else {
        result = await this.verifierV3Service.sendRequest(auth, dto.verifier, dto.credentialRequests, dto.eccPrivateKey, dto.holderAppUuid, dto.expirationDate, dto.metadata);
      }

      return res.set({ 'x-auth-token': result.authToken }).json(result.body);
    } catch (error) {
      if (error.name === 'CustError') {
        res.status(error.code);
        return res.json({
          name: 'CustomError',
          message: error.message
        });
      }

      res.status(400);
      return res.json(error);
    }
  }

  @Post('verifyPresentation')
  @UseGuards(AuthGuard)
  async verifyEncryptedPresentation (@Request() req: Req, @Body() dto: any, @Response() res: Res) {
    try {
      const auth = req.headers.authorization;

      let result;
      if (lt(req.headers.version as string, '2.0.0')) {
        result = await this.verifierService.verifyPresentation(auth, dto.encryptedPresentation, dto.verifier, dto.encryptionPrivateKey, dto.presentationRequest);
      } else if (lt(req.headers.version as string, '3.0.0')) {
        result = await this.verifierV2Service.verifyPresentation(auth, dto.encryptedPresentation, dto.verifier, dto.encryptionPrivateKey, dto.presentationRequest);
      } else {
        result = await this.verifierV3Service.verifyPresentation(auth, dto.encryptedPresentation, dto.verifier, dto.encryptionPrivateKey, dto.presentationRequest);
      }

      return res.set({ 'x-auth-token': result.authToken }).json(result.body);
    } catch (error) {
      if (error.name === 'CustError') {
        res.status(error.code);
        return res.json({
          name: 'CustomError',
          message: error.message
        });
      }
      res.status(400);
      return res.json(error);
    }
  }

  @Post('checkCredentialStatus')
  @UseGuards(AuthGuard)
  async checkCredentialStatus (@Request() req: Req, @Body() dto: any, @Response() res: Res) {
    try {
      const auth = req.headers.authorization;

      let result;
      if (lt(req.headers.version as string, '2.0.0')) {
        result = await this.verifierService.checkCredentialStatus(auth, dto.credentialId);
      } else if (lt(req.headers.version as string, '3.0.0')) {
        result = await this.verifierService.checkCredentialStatus(auth, dto.credentialId);
      } else {
        result = await this.verifierService.checkCredentialStatus(auth, dto.credentialId);
      }

      return res.set({ 'x-auth-token': result.authToken }).json(result.body);
    } catch (error) {
      if (error.name === 'CustError') {
        res.status(error.code);
        return res.json({
          name: 'CustomError',
          message: error.message
        });
      }
      res.status(400);
      return res.json(error);
    }
  }
}
