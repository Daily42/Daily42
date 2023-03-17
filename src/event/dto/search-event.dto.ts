import { IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';

export class SearchEventDto {
  @IsString()
  @IsOptional()
  readonly title?: string;

  @IsNumber()
  @IsOptional()
  readonly typeId?: number;

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
  readonly date?: Date;
}
