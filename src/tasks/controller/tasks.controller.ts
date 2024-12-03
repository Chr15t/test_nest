/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { TasksService } from '../services/tasks.service';
import { AssignedUserDto, CreateTaskDto } from '../dto/tasks.dto';
import { Body, Controller, Get, Post,Delete, Param,Patch, UseGuards } from '@nestjs/common';

@Controller('api/tasks')
export class TasksController {
  constructor(
    private readonly taskService: TasksService,
  ) {
  }

  @Get('list')
  getListTask() {
    return this.taskService.getListTask();
  }

  @Post('add')
  adduser(@Body() taskDto: CreateTaskDto) {
    return this.taskService.addTask(taskDto)
  }

  @Delete('remove/:id')
  deleteUser(@Param('id') taskId: string) {
    return this.taskService.deleteTask(taskId);
  }

  @Patch('update/:id')
  updateUser(@Body() taskDto: Partial<CreateTaskDto>, @Param('id') taskId: string) {
    return this.taskService.updateTask(taskDto, taskId)
  }

  @Get('find/:id')
  findOneTask(@Param('id') taskId: string) {
    return this.taskService.getTaskById(taskId);
  }

  @Patch('assign/:id')
  assignTask(@Param('id') taskId: string, @Body() dto: AssignedUserDto) {
    const { assigned } = dto;
    return this.taskService.assignTask(taskId, assigned)
  }
}
