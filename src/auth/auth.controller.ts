import {
  Controller,
  Get,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { FTStrategy } from './strategy/ft.strategy';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly fortyTwoStrategy: FTStrategy,
    private readonly authService: AuthService,
  ) {}

  @Get('me')
  me(@Req() req) {
    if (req.session.user == null) throw new UnauthorizedException();
    return req.session.user;
  }

  @Get('42')
  @UseGuards(AuthGuard('42'))
  fortyTwoLogin() {
    return;
  }

  @Get('42/callback')
  @UseGuards(AuthGuard('42'))
  async fortyTwoLoginCallback(@Req() req, @Res() res) {
    req.session.user = await this.authService.login(req.user);
    res.redirect('/auth/me');
  }
}
