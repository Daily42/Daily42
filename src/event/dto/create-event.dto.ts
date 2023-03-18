import { Type } from 'class-transformer';
import { IsNumber, IsString, MaxLength, ValidateNested } from 'class-validator';
import { CreateEventTimeDto } from './create-event-time.dto';

export class CreateEventDto {
  @IsString()
  @MaxLength(100)
  readonly title: string;

  @IsNumber()
  readonly typeId: number;

  @IsString()
  readonly context: string;

  @IsString()
  readonly locationCode: string;

  @IsString()
  @MaxLength(100)
  readonly locationName?: string;

  @ValidateNested({ each: true })
  @Type(() => CreateEventTimeDto)
  readonly dates: CreateEventTimeDto[];
}
