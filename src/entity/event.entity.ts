import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import EventTime from './event-time.entity';
import EventType from './event-type.entity';

@Entity()
export default class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  typeId: number;

  @Column()
  locationId: string;

  @Column()
  locationName: string;

  @ManyToOne(() => EventType, (type) => type.event)
  type: EventType;

  @Column()
  context: string;

  @OneToMany(() => EventTime, (time) => time.event)
  @JoinColumn()
  dates: EventTime[];

  @CreateDateColumn()
  createAt: Date;
}
