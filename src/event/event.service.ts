import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { AppDataSource } from '../database';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { SearchEventDto } from './dto/search-event.dto';
import Event from '../entity/event.entity';
import EventTime from '../entity/event-time.entity';
import EventType from '../entity/event-type.entity';
import Location from '../entity/location-entity';
import User from '../entity/user.entity';

@Injectable()
export class EventService {
  private eventRepo: Repository<Event>;
  private eventTimeRepo: Repository<EventTime>;
  private eventTypeRepo: Repository<EventType>;
  private locationRepo: Repository<Location>;
  constructor() {
    this.eventRepo = AppDataSource.getRepository(Event);
    this.eventTimeRepo = AppDataSource.getRepository(EventTime);
    this.eventTypeRepo = AppDataSource.getRepository(EventType);
    this.locationRepo = AppDataSource.getRepository(Location);
  }

  async getAll(search: SearchEventDto): Promise<Event[]> {
    const query = this.eventRepo
      .createQueryBuilder('event')
      .leftJoinAndSelect('event.location', 'loc')
      .leftJoinAndSelect('loc.parent', 'parentLoc')
      .leftJoinAndSelect('event.type', 'eventType')
      .leftJoinAndSelect('event.dates', 'eventTime');
    query.where('1=1');
    if (search.context != null) {
      query.andWhere('event.context like :context', {
        context: `%${search.context}%`,
      });
    }
    if (search.startDate != null) {
      query.andWhere('eventTime.startAt > :startDate', search);
    }
    if (search.endDate != null) {
      query.andWhere(
        'eventTime.startAt < date_add(date(:endDate), interval 1 day)',
        search,
      );
    }
    if (search.locationCode != null) {
      query.andWhere('event.locationCode = :locationCode', search);
    }
    if (search.locationName != null) {
      query.andWhere('event.locationName like :name', {
        name: `%${search.locationName}%`,
      });
    }
    if (search.title != null) {
      query.andWhere('event.title like :title', {
        title: `%${search.title}%`,
      });
    }
    if (search.typeId != null) {
      query.andWhere('event.typeId = :typeId', search);
    }
    query.orderBy('event.locationCode');
    query.orderBy('eventTime.startAt');
    return await query.getMany();
  }

  async getOne(id: number): Promise<Event> {
    const event = await this.eventRepo
      .createQueryBuilder('event')
      .leftJoinAndSelect('event.location', 'loc')
      .leftJoinAndSelect('loc.parent', 'parentLoc')
      .leftJoinAndSelect('event.type', 'eventType')
      .leftJoinAndSelect('event.dates', 'eventTime')
      .where('event.id = :id', { id })
      .getOne();
    if (event == null)
      throw new NotFoundException(`Event with ID ${id} not found.`);
    return event;
  }

  async deleteOne(author: User, id: number) {
    const dbevent = await this.getOne(id);
    await this.checkAuth(author, dbevent);
    await this.eventRepo.query('delete from event_time where eventId=?', [id]);
    await this.eventRepo.query('delete from event where id=?', [id]);
  }

  async create(author: User, eventData: CreateEventDto) {
    await this.checkEventType(eventData.typeId);
    await this.checkEventLocation(eventData.locationCode);
    if (eventData.dates == null || eventData.dates.length == 0)
      throw new BadRequestException(`no dates`);
    const event = { ...eventData } as Event;
    event.authorId = author.id;
    delete event.dates;
    const savedEvent = await this.eventRepo.save(event);
    if (savedEvent == null) throw new InternalServerErrorException();
    for (const timeData of eventData.dates) {
      const time = { ...timeData, eventId: savedEvent.id } as EventTime;
      const savedEventTime = await this.eventTimeRepo.save(time);
      if (savedEventTime == null) throw new InternalServerErrorException();
    }
  }

  async update(author: User, id: number, eventData: UpdateEventDto) {
    if (eventData.typeId != null) await this.checkEventType(eventData.typeId);
    if (eventData.locationCode != null)
      await this.checkEventLocation(eventData.locationCode);
    const dbevent = await this.getOne(id);
    await this.checkAuth(author, dbevent);
    const event = { ...eventData, id } as Event;
    event.updaterId = author.id;
    delete event.dates;
    const savedEvent = await this.eventRepo.save(event);
    if (savedEvent == null) throw new InternalServerErrorException();

    // date를 수정하지 않았을 경우 기존 date 유지
    if (eventData.dates == null || eventData.dates.length == 0) return;
    await this.eventTimeRepo.delete({ eventId: id });
    for (const timeData of eventData.dates) {
      const time = { ...timeData, eventId: id } as EventTime;
      const savedEventTime = this.eventTimeRepo.save(time);
      if (savedEventTime == null) throw new InternalServerErrorException();
    }
  }

  async checkEventType(id: number) {
    const type = await this.eventTypeRepo.findOne({
      where: { id },
    });
    if (type == null)
      throw new BadRequestException(`typeId ${id} is not available`);
  }

  async checkEventLocation(code: string) {
    const loc = await this.locationRepo.findOne({
      where: { code },
    });
    if (loc == null)
      throw new BadRequestException(`locationCode ${code} is not available`);
  }

  async checkAuth(user: User, event: Event) {
    if (user.isAdmin) return;
    if (event.authorId == user.id) return;
    throw new ForbiddenException();
  }
}
