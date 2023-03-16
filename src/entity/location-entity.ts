import { Column, Entity, OneToMany, PrimaryColumn, ManyToOne } from 'typeorm';
import Event from './event.entity';

@Entity()
export default class Location {
  @PrimaryColumn()
  code: string;

  @Column({ nullable: true })
  parentCode: string;

  @ManyToOne(() => Location, (loc) => loc.children)
  parent: string;

  @OneToMany(() => Location, (loc) => loc.parent)
  children: string[];

  @Column()
  title: string;

  @Column()
  sort: number;

  @OneToMany(() => Event, (event) => event.location)
  event: Event[];
}
