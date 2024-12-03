/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../guards/AuthGuards';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../dto/User.dto';
@Controller('api/user')
// @UseGuards(AuthGuard)
export class UserController {

  constructor(
    private readonly userService: UserService
  ){}
  @Get('list')
  getList() {
    return this.userService.getList();
  }

  @Post('add')
  adduser(@Body() userDto: CreateUserDto) {
    return this.userService.addUser(userDto)
  }



}
