import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Profile } from './../auth/profile.entity';
import { User } from './../auth/user.entity';
import { Attendee } from './../events/attendee.entity';
import { Event } from './../events/event.entity';
import { Subject } from './../school/subject.entity';
import { Teacher } from './../school/teacher.entity';
import { Course } from 'src/school/course.entity';

export default registerAs(
  'orm.config',
  (): TypeOrmModuleOptions => ({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'example',
    database: 'nest-events',
    entities: [Event, Attendee, Subject, Teacher, User, Profile, Course],
    synchronize: true,
    dropSchema: true,
  }),
);
