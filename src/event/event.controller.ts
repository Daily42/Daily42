import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { SearchEventDto } from './dto/search-event.dto';
import { AuthGuard } from 'src/auth/auth-guard';

@Controller('events')
@UseGuards(AuthGuard)
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Get()
  getAll(@Query() query: SearchEventDto) {
    return this.eventService.getAll(query);
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
