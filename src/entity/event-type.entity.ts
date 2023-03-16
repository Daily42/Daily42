import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import Event from './event.entity';

@Entity()
export default class EventType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  color: string;

  @OneToMany(() => Event, (event) => event.type)
  event: Event[];
}
