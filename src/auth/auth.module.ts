import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { FTStrategy } from './strategy/ft.strategy';

@Module({
  imports: [PassportModule],
  controllers: [AuthController],
  providers: [FTStrategy],
})
export class AuthModule {}
