import { Injectable, Logger } from '@nestjs/common';
import {
  registerVerifier as _registerVerifier,
  sendEmail as _sendEmail,
  sendSms as _sendSms,
  sendRequest as _sendRequest,
  verifyNoPresentation as _verifyNoPresentation,
  verifyPresentation as _verifyPresentation,
  verifyEncryptedPresentation as _verifyEncryptedPresentation,
  RegisteredVerifier,
  UnumDto,
  PresentationRequestResponse,
  NoPresentation,
  Presentation,
  VerifiedStatus
} from '@unumid/server-sdk';
import { DecryptedPresentation } from '@unumid/server-sdk/build/types';

import { EncryptedData } from 'library-issuer-verifier-utility';

@Injectable()
export class VerifierService {
  registerVerifier (name: string, customerUuid: string, url: string, apiKey: string): Promise<UnumDto<RegisteredVerifier>> {
    try {
      return _registerVerifier(name, customerUuid, url, apiKey);
    } catch (error) {
      Logger.error('Error handling registerVerifier with UnumID SaaS', error);
      throw error;
    }
  }

  sendEmail (authorization: string, to: string, subject: string, textBody: string, htmlBody: string): Promise<UnumDto> {
    try {
      return _sendEmail(authorization, to, subject, textBody, htmlBody);
    } catch (error) {
      Logger.error('Error handling sendEmail to UnumID SaaS', error);
      throw error;
    }
  }

  sendSms (authorization: string, to: string, msg: string): Promise<UnumDto> {
    try {
      return _sendSms(authorization, to, msg);
    } catch (error) {
      Logger.error('Error handling sendSms to UnumID SaaS', error);
      throw error;
    }
  }

  sendRequest (authorization:string, verifier: string, credentialRequests: [], eccPrivateKey: string, holderAppUuid: string, expirationDate?: Date, metadata?: Record<string, unknown>): Promise<UnumDto<PresentationRequestResponse>> {
    try {
      return _sendRequest(authorization, verifier, credentialRequests, eccPrivateKey, holderAppUuid, expirationDate, metadata);
    } catch (error) {
      Logger.error('Error handling sendRequest to UnumID SaaS', error);
      throw error;
    }
  }

  async verifyNoPresentation (authorization: string, noPresentation: NoPresentation, verifier: string): Promise<UnumDto<VerifiedStatus>> {
    try {
      return await _verifyNoPresentation(authorization, noPresentation, verifier);
    } catch (error) {
      Logger.error('Error handling verifying no presentation request to UnumID SaaS', error);
      throw error;
    }
  }

  async verifyPresentation (authorization: string, presentation: Presentation, verifier: string): Promise<UnumDto<VerifiedStatus>> {
    try {
      return await _verifyPresentation(authorization, presentation, verifier);
    } catch (error) {
      Logger.error('Error handling verify presentation request to UnumID Saas.', error);
      throw error;
    }
  }

  async verifyEncryptedPresentation (authorization: string, presentation: EncryptedData, verifier: string, encryptionPrivateKey: string): Promise<UnumDto<DecryptedPresentation>> {
    try {
      return await _verifyEncryptedPresentation(authorization, presentation, verifier, encryptionPrivateKey);
    } catch (error) {
      Logger.error('Error handling verifying encrypted presentation request to UnumID Saas.', error);
      throw error;
    }
  }
}
