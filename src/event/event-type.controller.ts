import { Controller, Get } from '@nestjs/common';
import { EventTypeService } from './event-type.service';

@Controller('event-type')
export class EventTypeController {
  constructor(private readonly eventTypeService: EventTypeService) {}

  @Get()
  getAll() {
    return this.eventTypeService.getAll();
  }
}
