/* eslint-disable prettier/prettier */
import { ITask } from "../interface/ITasks";
import { IsString, IsNotEmpty } from 'class-validator';
export class CreateTaskDto implements ITask {
  @IsString()
  @IsNotEmpty()
  name: string;

  
}