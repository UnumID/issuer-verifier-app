import { Injectable, Logger } from '@nestjs/common';
import {
  registerVerifier as _registerVerifier,
  sendEmail as _sendEmail,
  sendSms as _sendSms,
  sendRequest as _sendRequest,
  verifyPresentation as _verifyPresentation,
  RegisteredVerifier,
  UnumDto,
  DecryptedPresentation
} from '@unumid/server-sdk';
import { EncryptedData, PresentationRequestDto, PresentationRequestPostDto } from '@unumid/types';

@Injectable()
export class VerifierV2Service {
  registerVerifier (name: string, customerUuid: string, url: string, apiKey: string): Promise<UnumDto<RegisteredVerifier>> {
    try {
      return _registerVerifier(name, customerUuid, url, apiKey);
    } catch (error) {
      Logger.error('Error handling registerVerifier with UnumID SaaS', error);
      throw error;
    }
  }

  sendEmail (authorization: string, to: string, deeplink: string): Promise<UnumDto> {
    try {
      return _sendEmail(authorization, to, deeplink);
    } catch (error) {
      Logger.error('Error handling sendEmail to UnumID SaaS', error);
      throw error;
    }
  }

  sendSms (authorization: string, to: string, deeplink: string): Promise<UnumDto> {
    try {
      return _sendSms(authorization, to, deeplink);
    } catch (error) {
      Logger.error('Error handling sendSms to UnumID SaaS', error);
      throw error;
    }
  }

  sendRequest (authorization:string, verifier: string, credentialRequests: [], eccPrivateKey: string, holderAppUuid: string, expirationDate?: Date, metadata?: Record<string, unknown>): Promise<UnumDto<PresentationRequestPostDto>> {
    try {
      return _sendRequest(authorization, verifier, credentialRequests, eccPrivateKey, holderAppUuid, expirationDate, metadata);
    } catch (error) {
      Logger.error('Error handling sendRequest to UnumID SaaS', error);
      throw error;
    }
  }

  async verifyPresentation (authorization: string, presentation: EncryptedData, verifier: string, encryptionPrivateKey: string, presentationRequest?: PresentationRequestDto): Promise<UnumDto<DecryptedPresentation>> {
    try {
      return await _verifyPresentation(authorization, presentation, verifier, encryptionPrivateKey, presentationRequest);
    } catch (error) {
      Logger.error('Error handling verifying encrypted presentation request to UnumID Saas.', error);
      throw error;
    }
  }
}
