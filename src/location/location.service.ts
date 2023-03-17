import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { AppDataSource } from '../database';
import Location from '../entity/location-entity';

@Injectable()
export class LocationService {
  private locationRepo: Repository<Location>;
  constructor() {
    this.locationRepo = AppDataSource.getRepository(Location);
  }

  async getAll() {
    return await this.locationRepo.find();
  }

  async getOne(code: string) {
    const loc = await this.locationRepo
      .createQueryBuilder('loc')
      .leftJoinAndSelect('loc.parent', 'parentLoc')
      .where('loc.code = :code', { code })
      .getOne();
    if (loc == null)
      throw new NotFoundException(`Location with CODE ${code} not found.`);
    return loc;
  }

  async getChildren(parentCode: string) {
    return await this.locationRepo.find({ where: { parentCode } });
  }
}
