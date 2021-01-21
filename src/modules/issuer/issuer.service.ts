import { Injectable, Logger } from '@nestjs/common';
import {
  issueCredential as _issueCredential,
  revokeCredential as _revokeCredential,
  registerIssuer as _registerIssuer,
  IssuerDto,
  RegisteredIssuer
} from '@unumid/issuer-server-sdk';
import { CredentialSubject, Credential } from 'library-issuer-verifier-utility/build/types';

@Injectable()
export class IssuerService {
  registerIssuer (name: string, customerUuid: string, apiKey: string): Promise<IssuerDto<RegisteredIssuer>> {
    try {
      return _registerIssuer(name, customerUuid, apiKey);
    } catch (error) {
      Logger.error(`Error using UnumID SDK registerIssuer ${error}`);
      throw error;
    }
  }

  issueCredential (authorization: string | undefined, type: string | string[], issuer: string, credentialSubject: CredentialSubject, eccPrivateKey: string, expirationDate?: Date): Promise<IssuerDto<Credential>> {
    try {
      return _issueCredential(authorization, type, issuer, credentialSubject, eccPrivateKey, new Date(expirationDate));
    } catch (error) {
      Logger.error(`Error using UnumID SDK issueCredential ${error}`);
      throw error;
    }
  }

  revokeCredential (authorization: string, credentialId: string): Promise<IssuerDto<Credential>> {
    try {
      return _revokeCredential(authorization, credentialId);
    } catch (error) {
      Logger.error(`Error using UnumID SDK revokeCredential ${error}`);
      throw error;
    }
  }
}
