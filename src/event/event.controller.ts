import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  Patch,
} from '@nestjs/common';
import { EventService } from './event.service';
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
  getOne(@Param('id') eventId: number) {
    return this.eventService.getOne(eventId);
  }

  @Post()
  create(@Body() eventData: CreateEventDto) {
    return this.eventService.create(eventData);
  }

  @Patch(':id')
  patch(@Param('id') eventId: number, @Body() eventData: UpdateEventDto) {
    return this.eventService.update(eventId, eventData);
  }

  @Delete(':id')
  del(@Param('id') eventId: number) {
    return this.eventService.deleteOne(eventId);
  }
}
