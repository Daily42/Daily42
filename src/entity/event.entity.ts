import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import EventTime from './event-time.entity';

@Entity()
export default class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  typeId: number;

  @Column()
  context: string;

  @OneToMany(() => EventTime, (time) => time.event)
  @JoinColumn()
  dates: EventTime[];

  @CreateDateColumn()
  createAt: Date;
}
