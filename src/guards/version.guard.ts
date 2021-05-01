import { BadRequestException, CanActivate, ExecutionContext, Injectable, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class VersionGuard implements CanActivate {
  canActivate (
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.validateRequest(request);
  }

  validateRequest (request) {
    return this.requireAuth(request.headers.version);
  }

  requireAuth = (version: string | undefined): boolean => {
    if (!version) {
      Logger.error('No version header');
      throw new BadRequestException('Version header required.');
    }

    Logger.log(`Request made with version ${version}`);
    return true;
  };
}
