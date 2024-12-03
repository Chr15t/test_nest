/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post,Delete, Param,Patch, UseGuards } from '@nestjs/common';
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

  @Delete('remove/:id')
  deleteUser(@Param('id') userId: string) {
    return this.userService.deleteUser(userId);
  }

  @Patch('update/:id')
  updateUser(@Body() userDto: CreateUserDto, @Param('id') userId: string) {
    return this.userService.updateUser(userDto, userId)
  }

}
