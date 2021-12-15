import { Body, Controller, HttpCode, Post, Response, Request, UseGuards } from '@nestjs/common';
import { Response as Res, Request as Req } from 'express';
import { IssuerService } from './issuer.service';
import { AuthGuard } from '../../guards/auth.guard';
import { VersionGuard } from '../../guards/version.guard';
import { IssuerV2Service } from './issuer-v2/issuer-v2.service';
import { lt } from 'semver';
import { IssuerV3Service } from './issuer-v3/issuer-v3.service';

@UseGuards(VersionGuard)
@Controller('issuer/api')
export class IssuerController {
  constructor (private issuerService: IssuerService, private issuerV2Service: IssuerV2Service, private issuerV3Service: IssuerV3Service) {}

  // todo and real types to these requests
  @Post('register')
  //   @Header('x-auth-token')
  async register (@Request() req: Req, @Body() dto: any, @Response() res: Res) {
    try {
      let result;
      if (lt(req.headers.version as string, '2.0.0')) {
        result = await this.issuerService.registerIssuer(dto.name, dto.customerUuid, dto.apiKey);
      } else if (lt(req.headers.version as string, '3.0.0')) {
        result = await this.issuerV2Service.registerIssuer(dto.name, dto.customerUuid, dto.apiKey);
      } else {
        result = await this.issuerV3Service.registerIssuer(dto.customerUuid, dto.apiKey, dto.url, dto.versionInfo);
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

  @Post('issueCredential')
  @UseGuards(AuthGuard)
  async issueCredential (@Request() req: Req, @Body() dto: any, @Response() res: Res) {
    try {
      const auth = req.headers.authorization;

      let result;
      if (lt(req.headers.version as string, '2.0.0')) {
        result = await this.issuerService.issueCredential(auth, dto.type, dto.issuer, dto.credentialSubject, dto.eccPrivateKey, dto.expirationDate);
      } else if (lt(req.headers.version as string, '3.0.0')) {
        result = await this.issuerV2Service.issueCredential(auth, dto.type, dto.issuer, dto.credentialSubject, dto.eccPrivateKey, dto.expirationDate);
      } else {
        result = await this.issuerV3Service.issueCredential(auth, dto.type, dto.issuer, dto.credentialSubject, dto.eccPrivateKey, dto.expirationDate);
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

  @Post('updateCredentialStatus')
  @UseGuards(AuthGuard)
  @HttpCode(200)
  async updateCredentialStatus (@Request() req: Req, @Body() dto: any, @Response() res: Res) {
    try {
      const auth = req.headers.authorization;

      let result;
      if (lt(req.headers.version as string, '2.0.0')) {
        result = await this.issuerService.updateCredentialStatus(auth, dto.credentialId, dto.status);
      } else if (lt(req.headers.version as string, '3.0.0')) {
        result = await this.issuerV2Service.updateCredentialStatus(auth, dto.credentialId, dto.status);
      } else {
        result = await this.issuerV3Service.updateCredentialStatus(auth, dto.credentialId, dto.status);
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

  @Post('updateCredentialStatuses')
  @UseGuards(AuthGuard)
  @HttpCode(200)
  async updateCredentialStatuses (@Request() req: Req, @Body() dto: any, @Response() res: Res) {
    try {
      const auth = req.headers.authorization;

      if (lt(req.headers.version as string, '3.0.0')) {
        throw new Error('Not supported');
      }

      const result = await this.issuerV3Service.updateCredentialStatuses(auth, dto.credentialIds, dto.status);

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

  @Post('verifySubjectCredentialRequests')
  @UseGuards(AuthGuard)
  @HttpCode(200)
  async verifySubjectCredentialRequests (@Request() req: Req, @Body() dto: any, @Response() res: Res) {
    try {
      const auth = req.headers.authorization;

      if (lt(req.headers.version as string, '3.0.0')) {
        throw new Error('Not supported');
      }

      const result = await this.issuerV3Service.verifySubjectCredentialRequests(auth, dto.issuerDid, dto.subjectDid, dto.subjectCredentialRequests);

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

  @Post('verifySubjectDidDocument')
  @UseGuards(AuthGuard)
  @HttpCode(200)
  async verifySubjectDidDocument (@Request() req: Req, @Body() dto: any, @Response() res: Res) {
    try {
      const auth = req.headers.authorization;

      if (lt(req.headers.version as string, '3.0.0')) {
        throw new Error('Not supported');
      }
      const result = await this.issuerV3Service.verifySubjectDidDocument(auth, dto.issuerDid, dto.didDocument);

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
