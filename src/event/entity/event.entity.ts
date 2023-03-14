import { EventTime } from './event-time.entity';

export class Event {
  id: number;
  title: string;
  context: string;
  dates: EventTime[];
}
