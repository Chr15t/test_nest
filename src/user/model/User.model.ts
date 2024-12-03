/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IUser } from "../interface/IUser";


@Schema({ versionKey: false, timestamps: true })
export class User implements IUser {

  @Prop({ type: String, required: true})
  username: string;

  @Prop({ type: String, required: true})
  password: string;

  @Prop({ type: String, required: true})
  email: string;
}
export const UserSchema = SchemaFactory.createForClass(User).index({email: 1}, {unique: true})