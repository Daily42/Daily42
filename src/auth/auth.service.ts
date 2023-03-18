import { Injectable } from '@nestjs/common';
import User from '../entity/user.entity';
import { Repository } from 'typeorm';
import { AppDataSource } from 'src/database';
import { UserDto } from './dto/user.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  private userRepo: Repository<User>;
  constructor() {
    this.userRepo = AppDataSource.getRepository(User);
  }

  async getUser(intraId: string) {
    return await this.userRepo.findOne({ where: { intraId } });
  }

  async addUser(user: UserDto) {
    return await this.userRepo.save(user);
  }

  async login(user: LoginDto) {
    const dbuser =
      (await this.getUser(user.login)) ??
      (await this.addUser({
        intraId: user.login,
        email: user.email,
        profile: user.image,
      }));
    return dbuser;
  }

  // async logout(user: LogoutDto) {} - 들어올땐 맘대로지만 나갈땐 아니..
}
