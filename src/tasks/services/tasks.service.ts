/* eslint-disable prettier/prettier */
import { Injectable, BadRequestException } from '@nestjs/common';
import { Task } from '../model/task.model';
import { Model } from 'mongoose';
import { ITask } from '../interface/ITasks';

@Injectable()
export class TasksService {
  constructor(
    private readonly taskModel: Model<Task>,
  ) {

  }
 async  getListTask() {
    try {
      const listTask: ITask[] = await this.taskModel.find({}, { name: 1, assigned: 1, _id: 1}).lean() as unknown as ITask[];
      return { list: listTask}
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async  addTask(task: ITask) {
    try {
      await this.taskModel.create(task)
      return { message: 'Task added successfully' };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async updateTask(task: Partial<ITask>, taskId: string) {
    try {
      const updatedTask = await this.taskModel.findByIdAndUpdate(taskId, task, { new: true });
      if (!updatedTask) {
        throw new BadRequestException('Task not found');
      }
      return { message: 'Task updated successfully' };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async deleteTask(taskId: string) {
    try {
      const deletedTask = await this.taskModel.findByIdAndDelete(taskId);
      if (!deletedTask) {
        throw new BadRequestException('Task not found');
      }
      return { message: 'Task deleted successfully' };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async getTaskById(taskId: string) {
    try {
      const task = await this.taskModel.findById(taskId, { name: 1, assigned: 1, _id: 1}).populate('assigned', { username: 1, email: 1}).lean() as unknown as ITask;
      if (!task) {
        throw new BadRequestException('Task not found');
      }
      return task;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
