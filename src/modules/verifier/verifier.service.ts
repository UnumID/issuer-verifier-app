import { Injectable } from '@nestjs/common';
import {
  registerVerifier as _registerVerifier,
  sendEmail as _sendEmail,
  sendSms as _sendSms,
  sendRequest as _sendRequest,
  verifyNoPresentation as _verifyNoPresentation,
  verifyPresentation as _verifyPresentation,
  RegisteredVerifier,
  VerifierDto,
  Receipt,
  PresentationRequestResponse,
  NoPresentation,
  Presentation
} from '@unumid/verifier-server-sdk';

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

  sendRequest (authorization:string, verifier: string, credentialRequests: [], eccPrivateKey: string, holderAppUuid: string): Promise<VerifierDto<PresentationRequestResponse>> {
    return _sendRequest(authorization, verifier, credentialRequests, eccPrivateKey, holderAppUuid);
  }

  verifyNoPresentation (authorization: string, noPresentation: NoPresentation, verifier: string): Promise<VerifierDto<Receipt>> {
    return _verifyNoPresentation(authorization, noPresentation, verifier);
  }

  verifyPresentation (authorization: string, presentation: Presentation, verifier: string): Promise<VerifierDto<Receipt>> {
    return _verifyPresentation(authorization, presentation, verifier);
  }
}
