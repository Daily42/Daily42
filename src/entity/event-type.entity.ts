import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import Event from './event.entity';

@Entity()
export default class EventType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  color: string;

  // @OneToOne(() => Event, (event) => event.type)
  // event: Event;
}
