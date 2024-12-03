/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */

import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from '../interface/IUser';
import { User } from '../model/User.model';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../dto/User.dto';
@Injectable()
export class UserService {


  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<IUser>,
  ) {

  }
  async getList() {
    try {
      
      const listUser = await this.userModel.find({}, { username: 1, _id: 1, email: 1}).lean();
      return { list: listUser}
    } catch (error) {
      
    }
  }

  async addUser(userDto: IUser): Promise<{ message: string; userId?: string }> {
    try {
      const foundEmail = await this.userModel.findOne({ email: userDto.email }).lean();
      
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
  
}
