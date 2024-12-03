/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */

import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId, Types } from 'mongoose';
import { IUser } from '../interface/IUser';
import { User } from '../model/User.model';
import * as bcrypt from 'bcrypt';
import { TasksService } from 'src/tasks/services/tasks.service';
@Injectable()
export class UserService {



  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<IUser>,
    private readonly taskService: TasksService,
  ) {

  }
  async getList() {
    try {
      const listUser = await this.userModel.find({}, { username: 1, _id: 1, email: 1}).lean();
      return { list: listUser}
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async getTasks(userId: string) {
    try {
      const listTasks = await this.taskService.getTaskByUserId(userId);
      return { result: listTasks}
    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  async checkEmail(email: string, userId?: string) {
    console.log(email, userId);
    return userId ?  await this.userModel.findOne({ email: email }).lean() : await this.userModel.findOne({
      _id: { $ne: new Types.ObjectId(userId) },
      email: email,

    }).lean();
  }

  async addUser(userDto: IUser): Promise<{ message: string; userId?: string }> {
    try {
      const foundEmail = await this.checkEmail(userDto.email)

      if (foundEmail) throw new BadRequestException(`User with email ${userDto.email} already exists`);
      
      const hashedPassword = await bcrypt.hash(userDto.password, 10);

      const newUser = await this.userModel.create({
        ...userDto,
        password: hashedPassword,
      });
  
      if (!newUser) throw new HttpException('Failed to create user', HttpStatus.INTERNAL_SERVER_ERROR);
      
  
      return {
        message: 'User added successfully',
        userId: newUser._id.toString(),
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error; 
      }
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async updateUser(userDto: Partial<IUser>, userId: string) {
    try {

      const foundEmail = await this.checkEmail(userDto.email, userId)

      if (foundEmail) throw new BadRequestException(`User with email ${userDto.email} already exists`);
      const {password, ...rest} = userDto;

      const updatedUser = await this.userModel.findByIdAndUpdate(userId, rest, { new: true, runValidators: true });
      
      if (!updatedUser) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      
      return updatedUser;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async deleteUser(userId: string) {
    try {
      const deletedUser = await this.userModel.findByIdAndDelete(userId);
      
      if (!deletedUser) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      
      return { message: 'User deleted successfully' };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  
}
