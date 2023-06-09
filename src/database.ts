import 'reflect-metadata';
import { DataSource } from 'typeorm';
import User from './entity/user.entity';
import Event from './entity/event.entity';
import EventTime from './entity/event-time.entity';
import EventType from './entity/event-type.entity';
import Location from './entity/location-entity';
import * as dotenv from 'dotenv';

dotenv.config();
export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: 3306,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: true,
  timezone: 'Asia/Seoul',
  // logging: false,
  entities: [User, Event, EventTime, EventType, Location],
});
