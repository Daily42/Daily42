import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth-guard';
import { LocationService } from './location.service';

@Controller('locations')
@UseGuards(AuthGuard)
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Get()
  getAll() {
    return this.locationService.getAll();
  }

  @Get('/root')
  getRoot() {
    return this.locationService.getRoot();
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
