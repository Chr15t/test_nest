/* eslint-disable prettier/prettier */
import { ObjectId } from "mongoose";

export interface ITask {
  name: string;
  assigned: ObjectId[];
}