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
  Req,
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
  create(@Req() req, @Body() eventData: CreateEventDto) {
    return this.eventService.create(req.session.user, eventData);
  }

  @Patch(':id')
  patch(
    @Req() req,
    @Param('id') eventId: number,
    @Body() eventData: UpdateEventDto,
  ) {
    return this.eventService.update(req.session.user, eventId, eventData);
  }

  @Delete(':id')
  del(@Req() req, @Param('id') eventId: number) {
    return this.eventService.deleteOne(req.session.user, eventId);
  }
}
