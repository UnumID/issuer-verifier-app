import { CanActivate, ExecutionContext, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate (
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.validateRequest(request);
  }

  validateRequest (request) {
    return this.requireAuth(request.headers.authorization);
  }

  requireAuth = (auth: string | undefined): boolean => {
    if (!auth) {
      Logger.error('No auth string');
      throw new UnauthorizedException('No authorization string.');
    }

    // We assume that the header is a well-formed Bearer token with a single space
    // TODO: validate this and/or allow for multiple spaces
    // see https://trello.com/c/1jQE9mOT/534-saas-should-ensure-that-the-authorization-header-is-well-formed
    const token = auth.slice(7);

    if (!token) {
      Logger.error('No auth token');
      throw new UnauthorizedException('No authorization token.');
    }

    return true;
  };
}
