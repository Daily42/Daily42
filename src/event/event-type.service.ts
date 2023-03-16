import { Injectable } from '@nestjs/common';
import { AppDataSource } from '../database';
import { Repository } from 'typeorm';
import EventType from '../entity/event-type.entity';

@Injectable()
export class EventTypeService {
  private eventTypeRepo: Repository<EventType>;
  constructor() {
    this.eventTypeRepo = AppDataSource.getRepository(EventType);
  }

  async getAll() {
    return await this.eventTypeRepo.find();
  }
}
