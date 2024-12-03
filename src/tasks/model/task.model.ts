/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ITask } from '../interface/ITasks';
import mongoose, { ObjectId } from 'mongoose';
import { User } from 'src/user/model/User.model';



@Schema({ versionKey: false, timestamps: true })
export class Task implements ITask {

  @Prop({ type: String, required: true})
  name: string;

  @Prop({ type: Array<ObjectId>, ref: User.name })
  assigned: ObjectId[];
}
export const TaskSchema = SchemaFactory.createForClass(Task)