import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import EventTime from './event-time.entity';
import EventType from './event-type.entity';
import Location from './location-entity';

@Entity()
export default class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  typeId: number;

  @Column()
  locationCode: string;

  @ManyToOne(() => Location, (loc) => loc.event, { cascade: false })
  location: Location;

  @Column()
  locationName: string;

  @ManyToOne(() => EventType, (type) => type.event, { cascade: false })
  type: EventType;

  @Column()
  context: string;

  @OneToMany(() => EventTime, (time) => time.event, { cascade: false })
  dates: EventTime[];

  @CreateDateColumn()
  createAt: Date;
}
