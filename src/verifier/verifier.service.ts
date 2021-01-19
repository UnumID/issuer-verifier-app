import { Injectable } from '@nestjs/common';
import {
  registerVerifier as _registerVerifier,
  sendEmail as _sendEmail,
  sendSms as _sendSms,
  sendRequest as _sendRequest,
  verifyNoPresentation as _verifyNoPresentation,
  verifyPresentation as _verifyPresentation,
  RegisteredVerifierDto,
  AuthDto,
  PresentationRequestResponseDto,
  NoPresentation,
  Presentation
} from '@UnumId/verifier-sdk';

@Injectable()
export class VerifierService {
  registerVerifier (name: string, customerUuid: string, url: string, apiKey: string): Promise<RegisteredVerifierDto> {
    return _registerVerifier(name, customerUuid, url, apiKey);
  }

  sendEmail (authorization: string, to: string, subject: string, textBody: string, htmlBody: string): Promise<AuthDto> {
    return _sendEmail(authorization, to, subject, textBody, htmlBody);
  }

  sendSms (authorization: string, to: string, msg: string): Promise<AuthDto> {
    return _sendSms(authorization, to, msg);
  }

  sendRequest (authorization:string, verifier: string, credentialRequests: [], eccPrivateKey: string, holderAppUuid: string): Promise<PresentationRequestResponseDto> {
    return _sendRequest(authorization, verifier, credentialRequests, eccPrivateKey, holderAppUuid);
  }

  verifyNoPresentation (authorization: string, noPresentation: NoPresentation, verifier: string) {
    return _verifyNoPresentation(authorization, noPresentation, verifier);
  }

  verifyPresentation (authorization: string, presentation: Presentation, verifier: string) {
    return _verifyPresentation(authorization, presentation, verifier);
  }
}
