/* eslint-disable prettier/prettier */
import { ITask } from "../interface/ITasks";
import { IsString, IsNotEmpty, IsArray } from 'class-validator';
export class CreateTaskDto implements ITask {
  @IsString()
  @IsNotEmpty()
  name: string;

  
}


export class AssignedUserDto {

  @IsArray()
  @IsString({ each: true })
  assigned: string[]
}