import { Injectable } from '@nestjs/common';
import { AuthGuard as PassportAuthGuard } from '@nestjs/passport';

@Injectable()
export class AuthGuard extends PassportAuthGuard('session') {
  canActivate(context) {
    const request = context.switchToHttp().getRequest();
    return super.canActivate(context) && request.session.user != null;
  }
}
