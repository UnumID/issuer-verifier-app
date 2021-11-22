import { Injectable, Logger } from '@nestjs/common';
import {
  issueCredential as _issueCredential,
  updateCredentialStatus as _updateCredentialStatus,
  registerIssuer as _registerIssuer,
  verifySubjectCredentialRequests as _verifySubjectCredentialRequests,
  UnumDto,
  RegisteredIssuer
} from '@unumid/server-sdk';
import { VerifiedStatus } from '@unumid/server-sdk-deprecated-v2';
import { CredentialSubject, Credential, CredentialStatusOptions, CredentialPb, SubjectCredentialRequest } from '@unumid/types';

@Injectable()
export class IssuerV3Service {
  registerIssuer (customerUuid: string, apiKey: string): Promise<UnumDto<RegisteredIssuer>> {
    try {
      return _registerIssuer(customerUuid, apiKey);
    } catch (error) {
      Logger.error(`Error using UnumID SDK registerIssuer ${error}`);
      throw error;
    }
  }

  issueCredential (authorization: string | undefined, type: string | string[], issuer: string, credentialSubject: CredentialSubject, eccPrivateKey: string, expirationDate?: string): Promise<UnumDto<CredentialPb>> {
    try {
      const expiration = expirationDate ? new Date(expirationDate) : undefined;
      return _issueCredential(authorization, type, issuer, credentialSubject, eccPrivateKey, expiration);
    } catch (error) {
      Logger.error(`Error using UnumID SDK issueCredential ${error}`);
      throw error;
    }
  }

  updateCredentialStatus (authorization: string, credentialId: string, status: CredentialStatusOptions = 'revoked'): Promise<UnumDto<Credential>> {
    Logger.debug(`Updating credential ${credentialId} to status ${status}.`);

    try {
      return _updateCredentialStatus(authorization, credentialId, status);
    } catch (error) {
      Logger.error(`Error using UnumID SDK revokeCredential ${error}`);
      throw error;
    }
  }

  verifySubjectCredentialRequests (authorization: string, issuerDid: string, requests: SubjectCredentialRequest[]): Promise<UnumDto<VerifiedStatus>> {
    Logger.debug(`Verifying subject credential requests ${requests}.`);

    try {
      return _verifySubjectCredentialRequests(authorization, issuerDid, requests);
    } catch (error) {
      Logger.error(`Error using UnumID SDK verifySubjectCredentialRequests ${error}`);
      throw error;
    }
  }
}
