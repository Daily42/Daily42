import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { AppDataSource } from '../database';
import Event from '../entity/event.entity';
import { Repository } from 'typeorm';
import EventTime from 'src/entity/event-time.entity';

@Injectable()
export class EventService {
  private eventRepo: Repository<Event>;
  private eventTimeRepo: Repository<EventTime>;
  constructor() {
    this.eventRepo = AppDataSource.getRepository(Event);
    this.eventTimeRepo = AppDataSource.getRepository(EventTime);
  }

  async getAll(): Promise<Event[]> {
    return await this.eventRepo
      .createQueryBuilder('event')
      .leftJoinAndSelect('event.dates', 'eventTime')
      .getMany();
  }

  async getOne(id: number): Promise<Event> {
    const event = await this.eventRepo
      .createQueryBuilder('event')
      .leftJoinAndSelect('event.dates', 'eventTime')
      .where('event.id = :id', { id })
      .getOne();
    if (event == null)
      throw new NotFoundException(`Event with ID ${id} not found.`);
    return event;
  }

  async deleteOne(id: number) {
    await this.getOne(id);
    await this.eventRepo.query('delete from event_time where eventId=?', [id]);
    await this.eventRepo.query('delete from event where id=?', [id]);
  }

  async create(eventData: CreateEventDto) {
    if (eventData.dates == null || eventData.dates.length == 0)
      throw new BadRequestException(`no dates`);
    const event = new Event();
    event.title = eventData.title;
    event.context = eventData.context;
    event.typeId = eventData.typeId;
    const savedEvent = await this.eventRepo.save(event);
    if (savedEvent == null) throw new InternalServerErrorException();

    for (const timeData of eventData.dates) {
      const time = new EventTime();
      time.eventId = savedEvent.id;
      time.startAt = timeData.startAt;
      time.term = timeData.term;
      const savedEventTime = await this.eventTimeRepo.save(time);
      if (savedEventTime == null) throw new InternalServerErrorException();
    }
  }

  async update(id: number, eventData: UpdateEventDto) {
    if (eventData.dates == null || eventData.dates.length == 0)
      throw new BadRequestException(`no dates`);
    const event = await this.getOne(id);
    event.title = eventData.title;
    event.typeId = eventData.typeId;
    event.context = eventData.context;
    const savedEvent = await this.eventRepo.save(event);
    if (savedEvent == null) throw new InternalServerErrorException();
    await this.eventTimeRepo.delete({ eventId: id });
    for (const timeData of eventData.dates) {
      const time = new EventTime();
      time.eventId = id;
      time.startAt = timeData.startAt;
      time.term = timeData.term;
      const savedEventTime = this.eventTimeRepo.save(time);
      if (savedEventTime == null) throw new InternalServerErrorException();
    }
  }
}
