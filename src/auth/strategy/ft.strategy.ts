import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-42';

@Injectable()
export class FTStrategy extends PassportStrategy(Strategy, '42') {
  constructor() {
    super({
      clientID: process.env.FT_UID,
      clientSecret: process.env.FT_SECRET,
      callbackURL: '/auth/42/callback',
      profileFields: {
        userId: 'id',
        email: 'email',
        login: 'login',
        userName: 'name',
        image: 'image',
      },
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any) {
    const { userId, email, displayName, login, image } = profile;
    return { userId, email, name: displayName, login, image: image?.link };
  }
}
