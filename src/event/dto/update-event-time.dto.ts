import { PartialType } from '@nestjs/mapped-types';
import { CreateEventTimeDto } from './create-event-time.dto';

export class UpdateEventTimeDto extends PartialType(CreateEventTimeDto) {}
