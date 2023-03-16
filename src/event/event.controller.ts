import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { EventService } from './event.service';
import Event from '../entity/event.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Controller('events')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Get()
  getAll() {
    return this.eventService.getAll();
  }

  @Get(':id')
  async getOne(@Param('id') eventId: number): Promise<Event> {
    return await this.eventService.getOne(eventId);
  }

  @Post()
  create(@Body() eventData: CreateEventDto) {
    return this.eventService.create(eventData);
  }

  @Put(':id')
  put(@Param('id') eventId: number, @Body() eventData: UpdateEventDto) {
    return this.eventService.update(eventId, eventData);
  }

  @Delete(':id')
  del(@Param('id') eventId: number) {
    return this.eventService.deleteOne(eventId);
  }
}
