/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TasksModule } from './tasks/tasks.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Task, TaskSchema } from './tasks/model/task.model';
import { User, UserSchema } from './user/model/User.model';

@Module({
  imports: [
    UserModule, 
    TasksModule,
    MongooseModule.forRoot(process.env.MONGO_URI),
    MongooseModule.forFeature([
      {  name: User.name, schema: UserSchema },
      { name: Task.name, schema: TaskSchema}
    ]),

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
