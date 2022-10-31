import { Injectable, Logger } from '@nestjs/common';
import {
  registerVerifier as _registerVerifier,
  sendEmail as _sendEmail,
  sendSms as _sendSms,
  sendRequest as _sendRequest,
  verifyPresentation as _verifyPresentation,
  checkCredentialStatuses as _checkCredentialStatuses,
  RegisteredVerifier,
  UnumDto,
  DecryptedPresentation,
  CredentialStatusInfo
} from '@unumid/server-sdk';
import { EncryptedData, PresentationRequestDto, PresentationRequestPostDto, CredentialIdToStatusMap } from '@unumid/types';

@Injectable()
export class VerifierV4Service {
  registerVerifier (url: string, apiKey: string): Promise<UnumDto<RegisteredVerifier>> {
    try {
      return _registerVerifier(apiKey, url);
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

  sendRequest (authorization:string, verifier: string, credentialRequests: [], eccPrivateKey: string, holderAppUuid: string, expirationDate?: Date, metadata?: Record<string, unknown>): Promise<UnumDto<PresentationRequestDto>> {
    try {
      const expiration = expirationDate ? new Date(expirationDate) : undefined;
      return _sendRequest(authorization, verifier, credentialRequests, eccPrivateKey, holderAppUuid, expiration, metadata);
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

  checkCredentialStatuses (authorization: string, credentialIds: string[]): Promise<UnumDto<CredentialIdToStatusMap>> {
    try {
      return _checkCredentialStatuses(authorization, credentialIds);
    } catch (error) {
      Logger.error('Error handling checking credential status request to UnumID Saas.', error);
      throw error;
    }
  }
}
