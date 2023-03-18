import { IsDateString, IsOptional, IsString } from 'class-validator';

export class SearchEventDto {
  @IsString()
  @IsOptional()
  readonly title?: string;

  @IsString()
  @IsOptional()
  readonly typeId?: string;

  @IsString()
  @IsOptional()
  readonly context?: string;

  @IsString()
  @IsOptional()
  readonly locationCode?: string;

  @IsString()
  @IsOptional()
  readonly locationName?: string;

  @IsDateString()
  @IsOptional()
  readonly startDate?: Date;

  @IsDateString()
  @IsOptional()
  readonly endDate?: Date;
}
