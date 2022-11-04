import { Injectable, Logger } from '@nestjs/common';
import {
  issueCredentials as _issueCredentials,
  reEncryptCredentials as _reEncryptCredentials,
  handleSubjectCredentialRequests as _handleSubjectCredentialRequests,
  updateCredentialStatuses as _updateCredentialStatuses,
  registerIssuer as _registerIssuer,
  verifySubjectCredentialRequests as _verifySubjectCredentialRequests,
  verifySignedDid as _verifySignedDid,
  revokeAllCredentials as _revokeAllCredentials,
  UnumDto,
  RegisteredIssuer,
  VerifiedStatus,
  HandleSubjectCredentialRequestsOptions
} from '@unumid/server-sdk';
import { CredentialSubject, Credential, CredentialStatusOptions, CredentialPb, SignedDidDocument, SubjectCredentialRequests, VersionInfo, DID, CredentialData } from '@unumid/types';

@Injectable()
export class IssuerV4Service {
  registerIssuer (apiKey: string, url: string, versionInfo: VersionInfo[]): Promise<UnumDto<RegisteredIssuer>> {
    try {
      return _registerIssuer(apiKey, url, versionInfo);
    } catch (error) {
      Logger.error(`Error using UnumID SDK registerIssuer ${error}`);
      throw error;
    }
  }

  issueCredentials (authorization: string | undefined, issuerDid: string, subjectDid: string, credentialDataList: CredentialData[], eccPrivateKey: string, expirationDate?: string, issueToSelf = true): Promise<UnumDto<(Credential)[]>> {
    try {
      const expiration = expirationDate ? new Date(expirationDate) : undefined;
      return _issueCredentials(authorization, issuerDid, subjectDid, credentialDataList, eccPrivateKey, expiration, issueToSelf) as Promise<UnumDto<Credential[]>>;
    } catch (error) {
      Logger.error(`Error using UnumID SDK issueCredential ${error}`);
      throw error;
    }
  }

  reEncryptCredentials (authorization: string, issuerDid: string, signingPrivateKey: string, encryptionPrivateKey: string, subjectDid: string, issuerEncryptionKeyId: string, credentialTypes: string[]): Promise<UnumDto<(Credential)[]>> {
    try {
      return _reEncryptCredentials(authorization, issuerDid, signingPrivateKey, encryptionPrivateKey, issuerEncryptionKeyId, subjectDid, credentialTypes);
    } catch (error) {
      Logger.error(`Error using UnumID SDK issueCredential ${error}`);
      throw error;
    }
  }

  handleSubjectCredentialRequests (options: HandleSubjectCredentialRequestsOptions): Promise<UnumDto<(Credential)[]>> {
    try {
      return _handleSubjectCredentialRequests(options);
    } catch (error) {
      Logger.error(`Error using UnumID SDK handleSubjectCredentialRequests ${error}`);
      throw error;
    }
  }

  updateCredentialStatuses (authorization: string, credentialIds: string[], status: CredentialStatusOptions = 'revoked'): Promise<UnumDto<Credential>> {
    Logger.debug(`Updating credentials ${credentialIds} to status ${status}.`);

    try {
      return _updateCredentialStatuses(authorization, credentialIds, status);
    } catch (error) {
      Logger.error(`Error using UnumID SDK revokeCredential ${error}`);
      throw error;
    }
  }

  verifySubjectCredentialRequests (authorization: string, issuerDid: string, subjectDid: string, requests: SubjectCredentialRequests): Promise<UnumDto<VerifiedStatus>> {
    Logger.debug(`Verifying subject credential requests ${requests}.`);

    try {
      return _verifySubjectCredentialRequests(authorization, issuerDid, subjectDid, requests);
    } catch (error) {
      Logger.error(`Error using UnumID SDK verifySubjectCredentialRequests ${error}`);
      throw error;
    }
  }

  verifySignedDid (authorization: string, issuerDid: string, did: DID): Promise<UnumDto<VerifiedStatus>> {
    Logger.debug(`Verifying subject SignedDidDocument ${did}.`);

    try {
      return _verifySignedDid(authorization, issuerDid, did);
    } catch (error) {
      Logger.error(`Error using UnumID SDK verifySubjectDidDocument ${error}`);
      throw error;
    }
  }

  revokeAllCredentials (authorization: string, issuerDid: string, signingPrivateKey: string, subjectDid: string): Promise<UnumDto<VerifiedStatus>> {
    Logger.debug(`Revoking all credentials issued by ${issuerDid} for subject ${subjectDid}.`);

    try {
      return _revokeAllCredentials(authorization, issuerDid, signingPrivateKey, subjectDid);
    } catch (error) {
      Logger.error(`Error using UnumID SDK verifySubjectDidDocument ${error}`);
      throw error;
    }
  }
}
