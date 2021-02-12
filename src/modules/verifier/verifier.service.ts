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
  VerifierDto,
  Receipt,
  PresentationRequestResponse,
  NoPresentation,
  Presentation,
  VerifiedStatus
} from '@unumid/server-sdk';

import { EncryptedData } from 'library-issuer-verifier-utility';

@Injectable()
export class VerifierService {
  registerVerifier (name: string, customerUuid: string, url: string, apiKey: string): Promise<VerifierDto<RegisteredVerifier>> {
    return _registerVerifier(name, customerUuid, url, apiKey);
  }

  sendEmail (authorization: string, to: string, subject: string, textBody: string, htmlBody: string): Promise<VerifierDto> {
    return _sendEmail(authorization, to, subject, textBody, htmlBody);
  }

  sendSms (authorization: string, to: string, msg: string): Promise<VerifierDto> {
    return _sendSms(authorization, to, msg);
  }

  sendRequest (authorization:string, verifier: string, credentialRequests: [], eccPrivateKey: string, holderAppUuid: string, expirationDate?: Date, metadata?: Record<string, unknown>): Promise<VerifierDto<PresentationRequestResponse>> {
    return _sendRequest(authorization, verifier, credentialRequests, eccPrivateKey, holderAppUuid, expirationDate, metadata);
  }

  async verifyNoPresentation (authorization: string, noPresentation: NoPresentation, verifier: string): Promise<VerifierDto<Receipt | VerifiedStatus>> {
    try {
      return await _verifyNoPresentation(authorization, noPresentation, verifier);
    } catch (error) {
      Logger.error('Error handling verifying no presentation request to UnumID SaaS', error);

      if (error.statusCode === -1) {
        const messages = error.message.split('#');
        const authToken = messages[0] === 'undefined' ? undefined : messages[0];
        const result: VerifierDto<VerifiedStatus> = {
          authToken,
          body: {
            isVerified: false,
            message: messages[1]
          }
        };
        return result;
      }

      throw error;
    }
  }

  async verifyPresentation (authorization: string, presentation: Presentation, verifier: string): Promise<VerifierDto<Receipt | VerifiedStatus>> {
    try {
      return await _verifyPresentation(authorization, presentation, verifier);
    } catch (error) {
      Logger.error('Error handling verify presentation request to UnumID Saas.', error);

      if (error.statusCode === -1) {
        const messages = error.message.split('#');
        const authToken = messages[0] === 'undefined' ? undefined : messages[0];
        const result: VerifierDto<VerifiedStatus> = {
          authToken,
          body: {
            isVerified: false,
            message: messages[1]
          }
        };
        return result;
      }

      throw error;
    }
  }

  async verifyEncryptedPresentation (authorization: string, presentation: EncryptedData, verifier: string, encryptionPrivateKey: string): Promise<VerifierDto<Receipt | VerifiedStatus>> {
    try {
      return await _verifyEncryptedPresentation(authorization, presentation, verifier, encryptionPrivateKey);
    } catch (error) {
      Logger.error('Error handling verifying encrypted presentation request to UnumID Saas.', error);

      if (error.statusCode === -1) {
        const messages = error.message.split('#');
        const authToken = messages[0] === 'undefined' ? undefined : messages[0];
        const result: VerifierDto<VerifiedStatus> = {
          authToken,
          body: {
            isVerified: false,
            message: messages[1]
          }
        };
        return result;
      }

      throw error;
    }
  }
}
