import { IsDateString, IsNumber } from 'class-validator';

export class CreateEventTimeDto {
  @IsDateString()
  readonly startAt: Date;

  @IsNumber()
  readonly term: number;
}
