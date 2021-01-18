import { Injectable, Logger } from '@nestjs/common';
import {
  issueCredential as _issueCredential,
  revokeCredential as _revokeCredential,
  registerIssuer as _registerIssuer,
  IssuedCredentialDto,
  RevokedCredentialDto,
  RegisteredIssuerDto
} from '@UnumId/issuer-sdk';
import { CredentialSubject } from 'library-issuer-verifier-utility/build/types';

@Injectable()
export class IssuerService {
  registerIssuer (name: string, customerUuid: string, apiKey: string): Promise<RegisteredIssuerDto> {
    return _registerIssuer(name, customerUuid, apiKey);
  }

  issueCredential (authorization: string | undefined, type: string | string[], issuer: string, credentialSubject: CredentialSubject, eccPrivateKey: string, expirationDate?: Date): Promise<IssuedCredentialDto> {
    try {
      return _issueCredential(authorization, type, issuer, credentialSubject, eccPrivateKey, expirationDate);
    } catch (error) {
      Logger.error(`Error using UnumID SDK issueCredential ${error}`);
      throw error;
    }
  }

  revokeCredential (authorization: string, credentialId: string): Promise<RevokedCredentialDto> {
    try {
      return _revokeCredential(authorization, credentialId);
    } catch (error) {
      Logger.error(`Error using UnumID SDK revokeCredential ${error}`);
      throw error;
    }
  }
}
