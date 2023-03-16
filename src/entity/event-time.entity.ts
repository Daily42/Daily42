import { PrimaryGeneratedColumn, Column, Entity, ManyToOne } from 'typeorm';
import Event from './event.entity';

@Entity()
export default class EventTime {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  eventId: number;

  @Column()
  startAt: Date;

  @Column()
  term: number;

  @ManyToOne(() => Event, (event) => event.dates)
  event: Event;
}
