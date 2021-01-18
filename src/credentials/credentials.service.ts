import { Injectable } from '@nestjs/common';
import {
  issueCredential as _issueCredential,
  IssuedCredentialDto,
} from '@UnumId/issuer-sdk';
import { CredentialSubject, JSONObj } from 'library-issuer-verifier-utility/build/types';

@Injectable()
export class CredentialsService {
  issueCredential(authorization: string | undefined, type: string | string[], issuer: string, credentialSubject: CredentialSubject, eccPrivateKey: string,expirationDate?: Date): Promise<IssuedCredentialDto> {
    return _issueCredential(authorization, type, issuer, credentialSubject, eccPrivateKey, expirationDate);
  }
}
