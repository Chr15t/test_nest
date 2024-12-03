/* eslint-disable prettier/prettier */
import { ObjectId } from "mongoose";

export interface ITask {
  _id?: string | ObjectId;
  name: string;
  assigned?: ObjectId[];
}