import { Type } from 'class-transformer';
import { IsString, ValidateNested } from 'class-validator';
import { EventTime } from '../entity/event-time.entity';

export class CreateEventDto {
  @IsString()
  readonly title: string;

  @IsString()
  readonly context: string;

  @ValidateNested({ each: true })
  @Type(() => EventTime)
  readonly dates: EventTime[];
}
