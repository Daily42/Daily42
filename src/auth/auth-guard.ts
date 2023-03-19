import { Injectable } from '@nestjs/common';
import { AuthGuard as PassportAuthGuard } from '@nestjs/passport';
import { AppDataSource } from '../database';
import User from '../entity/user.entity';

@Injectable()
export class AuthGuard extends PassportAuthGuard('session') {
  async canActivate(context) {
    const request = context.switchToHttp().getRequest();
    if (request.session.user == null && process.env.DEBUG_INTRA_ID)
      request.session.user = await AppDataSource.getRepository(User).findOne({
        where: { intraId: process.env.DEBUG_INTRA_ID },
      });
    return super.canActivate(context) && request.session.user?.intraId != null;
  }
}
