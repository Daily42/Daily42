import { Injectable } from '@nestjs/common';
import { AuthGuard as PassportAuthGuard } from '@nestjs/passport';
import { AppDataSource } from '../database';
import User from '../entity/user.entity';

@Injectable()
export class AuthFTGuard extends PassportAuthGuard('session') {
  async canActivate(context) {
    const request = context.switchToHttp().getRequest();
    request.session.redirectUrl = request.query.redirectUrl;
    return super.canActivate(context) && true;
  }
}
