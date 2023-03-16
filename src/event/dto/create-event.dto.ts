import { Type } from 'class-transformer';
import { IsNumber, IsString, ValidateNested } from 'class-validator';
import { CreateEventTimeDto } from './create-event-time.dto';

export class CreateEventDto {
  @IsString()
  readonly title: string;

  @IsNumber()
  readonly typeId: number;

  @IsString()
  readonly context: string;

  @ValidateNested({ each: true })
  @Type(() => CreateEventTimeDto)
  readonly dates: CreateEventTimeDto[];
}
