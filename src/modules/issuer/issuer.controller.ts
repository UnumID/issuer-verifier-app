import { Body, Controller, HttpCode, Post, Response, Request, UseGuards } from '@nestjs/common';
import { Response as Res, Request as Req } from 'express';
import { IssuerService } from './issuer.service';
import { AuthGuard } from '../../guards/auth.guard';
import { VersionGuard } from '../../guards/version.guard';
import { IssuerV2Service } from './issuer-v2/issuer-v2.service';
import { lt } from 'semver';
import { IssuerV3Service } from './issuer-v3/issuer-v3.service';
import { IssuerV4Service } from './issuer-v4/issuer-v4.service';
import { HandleSubjectCredentialRequestsOptions } from '@unumid/server-sdk';

@UseGuards(VersionGuard)
@Controller('issuer/api')
export class IssuerController {
  constructor (private issuerService: IssuerService, private issuerV2Service: IssuerV2Service, private issuerV3Service: IssuerV3Service, private issuerV4Service: IssuerV4Service) {}

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
      } else if (lt(req.headers.version as string, '4.0.0')) {
        result = await this.issuerV3Service.registerIssuer(dto.apiKey, dto.url, dto.versionInfo);
      } else {
        result = await this.issuerV4Service.registerIssuer(dto.apiKey, dto.url, dto.versionInfo);
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

  @Post('issueCredentials')
  @UseGuards(AuthGuard)
  async issueCredentials (@Request() req: Req, @Body() dto: any, @Response() res: Res) {
    try {
      const auth = req.headers.authorization;

      let result;
      if (lt(req.headers.version as string, '3.0.0')) {
        throw new Error('Not supported');
      } else if (lt(req.headers.version as string, '4.0.0')) {
        result = await this.issuerV3Service.issueCredentials(auth, dto.issuerDid, dto.subjectDid, dto.credentialDataList, dto.eccPrivateKey, dto.expirationDate, dto.issueToSelf);
      } else {
        result = await this.issuerV4Service.issueCredentials(auth, dto.issuerDid, dto.subjectDid, dto.credentialDataList, dto.eccPrivateKey, dto.expirationDate, dto.issueToSelf);
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

  @Post('reEncryptCredentials')
  @UseGuards(AuthGuard)
  async reEncryptCredentials (@Request() req: Req, @Body() dto: any, @Response() res: Res) {
    try {
      const auth = req.headers.authorization;

      let result;
      if (lt(req.headers.version as string, '3.0.0')) {
        throw new Error('Not supported');
      } else if (lt(req.headers.version as string, '4.0.0')) {
        result = await this.issuerV3Service.reEncryptCredentials(auth, dto.issuerDid, dto.signingPrivateKey, dto.encryptionPrivateKey, dto.subjectDid, dto.issuerEncryptionKeyId, dto.credentialTypes);
      } else {
        result = await this.issuerV4Service.reEncryptCredentials(auth, dto.issuerDid, dto.signingPrivateKey, dto.encryptionPrivateKey, dto.subjectDid, dto.issuerEncryptionKeyId, dto.credentialTypes);
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

  @Post('handleSubjectCredentialRequests')
  @UseGuards(AuthGuard)
  async handleSubjectCredentialRequests (@Request() req: Req, @Body() dto: any, @Response() res: Res) {
    try {
      const auth = req.headers.authorization;

      const options: HandleSubjectCredentialRequestsOptions = {
        authorization: auth,
        issuerDid: dto.issuerDid,
        subjectDid: dto.subjectDid,
        subjectCredentialRequests: dto.subjectCredentialRequests,
        reEncryptCredentialsOptions: {
          signingPrivateKey: dto.reEncryptCredentialsOptions.signingPrivateKey,
          encryptionPrivateKey: dto.reEncryptCredentialsOptions.encryptionPrivateKey,
          issuerEncryptionKeyId: dto.issuerEncryptionKeyId
        }
      };

      let result;
      if (lt(req.headers.version as string, '4.0.0')) {
        throw new Error('Not supported');
      } else {
        result = await this.issuerV4Service.handleSubjectCredentialRequests(options);
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
      } else if (lt(req.headers.version as string, '4.0.0')) {
        result = await this.issuerV3Service.updateCredentialStatus(auth, dto.credentialId, dto.status);
      } else {
        throw new Error('Not supported');
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

      let result;
      if (lt(req.headers.version as string, '3.0.0')) {
        throw new Error('Not supported');
      } else if (lt(req.headers.version as string, '4.0.0')) {
        result = await this.issuerV3Service.updateCredentialStatuses(auth, dto.credentialIds, dto.status);
      } else {
        result = await this.issuerV4Service.updateCredentialStatuses(auth, dto.credentialIds, dto.status);
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

  @Post('verifySubjectCredentialRequests')
  @UseGuards(AuthGuard)
  @HttpCode(200)
  async verifySubjectCredentialRequests (@Request() req: Req, @Body() dto: any, @Response() res: Res) {
    try {
      const auth = req.headers.authorization;

      let result;
      if (lt(req.headers.version as string, '3.0.0')) {
        throw new Error('Not supported');
      } else if (lt(req.headers.version as string, '4.0.0')) {
        result = await this.issuerV3Service.verifySubjectCredentialRequests(auth, dto.issuerDid, dto.subjectDid, dto.subjectCredentialRequests);
      } else {
        result = await this.issuerV4Service.verifySubjectCredentialRequests(auth, dto.issuerDid, dto.subjectDid, dto.subjectCredentialRequests);
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

  @Post('verifySignedDid')
  @UseGuards(AuthGuard)
  @HttpCode(200)
  async verifySignedDid (@Request() req: Req, @Body() dto: any, @Response() res: Res) {
    try {
      const auth = req.headers.authorization;

      let result;
      if (lt(req.headers.version as string, '3.0.0')) {
        throw new Error('Not supported');
      } else if (lt(req.headers.version as string, '4.0.0')) {
        result = await this.issuerV3Service.verifySignedDid(auth, dto.issuerDid, dto.did);
      } else {
        result = await this.issuerV4Service.verifySignedDid(auth, dto.issuerDid, dto.did);
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

  @Post('revokeAllCredentials')
  @UseGuards(AuthGuard)
  @HttpCode(200)
  async revokeAllCredentials (@Request() req: Req, @Body() dto: any, @Response() res: Res) {
    try {
      const auth = req.headers.authorization;

      let result;
      if (lt(req.headers.version as string, '3.0.0')) {
        throw new Error('Not supported');
      } else if (lt(req.headers.version as string, '4.0.0')) {
        result = await this.issuerV3Service.revokeAllCredentials(auth, dto.issuerDid, dto.privateSigningKey, dto.subjectDid);
      } else {
        result = await this.issuerV4Service.revokeAllCredentials(auth, dto.issuerDid, dto.privateSigningKey, dto.subjectDid);
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
