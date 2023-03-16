import { Controller, Get, Param } from '@nestjs/common';
import { LocationService } from './location.service';

@Controller('locations')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Get()
  getAll() {
    return this.locationService.getAll();
  }

  @Get('/:code')
  getOne(@Param('code') code: string) {
    return this.locationService.getOne(code);
  }

  @Get('/children/:code')
  getChildren(@Param('code') code: string) {
    return this.locationService.getChildren(code);
  }
}
