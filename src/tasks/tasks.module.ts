/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */

import { Module } from '@nestjs/common';
import { TasksController } from './controller/tasks.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../user/model/User.model';
import { Task, TaskSchema } from './model/task.model';
import { JwtService } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { TasksService } from './services/tasks.service';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),
    UserModule,

  ],
  controllers: [TasksController],
  providers: [JwtService, TasksService],

})
export class TasksModule {}
