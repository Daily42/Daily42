import { Column, Entity, OneToOne, OneToMany, PrimaryColumn } from 'typeorm';
import Event from './event.entity';

@Entity()
export default class Location {
  @PrimaryColumn()
  code: string;

  @Column({ nullable: true })
  parentCode: string;

  @OneToOne(() => Location, (loc) => loc.parentCode)
  parent: string;

  @Column()
  title: string;

  @Column()
  sort: number;

  @OneToMany(() => Event, (event) => event.location)
  event: Event[];
}
