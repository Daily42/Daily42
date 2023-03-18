import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth-guard';
import { EventTypeService } from './event-type.service';

@Controller('event-type')
@UseGuards(AuthGuard)
export class EventTypeController {
  constructor(private readonly eventTypeService: EventTypeService) {}

  @Get()
  getAll() {
    return this.eventTypeService.getAll();
  }
}
