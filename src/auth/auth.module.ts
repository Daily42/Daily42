import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { FTStrategy } from './strategy/ft.strategy';
import { AuthService } from './auth.service';

@Module({
  imports: [PassportModule.register({ session: true })],
  controllers: [AuthController],
  providers: [FTStrategy, AuthService],
})
export class AuthModule {}
