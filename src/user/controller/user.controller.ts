/* eslint-disable prettier/prettier */
import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../guards/AuthGuards';
import { UserService } from '../services/user.service';
@Controller('api/user')
@UseGuards(AuthGuard)
export class UserController {

  constructor(
    private readonly userService: UserService
  ){}
  @Get('list')
  getList() {
    return this.userService.getList();
  }
}
