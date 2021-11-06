

import {
  Inject,
  Controller,
  Provide,
  Query,
  Get,
  Post,
  ALL,
  Body,
  Put,
  Del,
 } from '@midwayjs/decorator';
import { Context } from 'egg';
import { IGetUserResponse } from '../interface';
import { IGetTodoItemResponse } from '../interface';
import { TodoItemService } from '../service/todoItem';
import { TNgaTodoItem } from '../entity/TNgaTodoItem';
import { UserService } from '../service/user';


@Provide()
@Controller('/api')
export class APIController {
  @Inject()
  ctx: Context;

  @Inject()
  userService: UserService;

  @Inject()
  todoItemService: TodoItemService;

  @Post('/get_user')
  async getUser(@Query() uid: string): Promise<IGetUserResponse> {
    const user = await this.userService.getUser({ uid });
    return { success: true, message: 'OK', data: user };
  }

  @Get('/get')
  async get(@Query() id: number): Promise<IGetTodoItemResponse> {
    const todoItems = await this.todoItemService.get(id);
    return { success: true, message: 'OK', data: todoItems };
  }

  @Post('/save')
  async save(@Body(ALL) todoItem: TNgaTodoItem): Promise<IGetTodoItemResponse> {
    const result = await this.todoItemService.save(todoItem);
    return { success: true, message: 'OK', data: result };
  }

  @Put('/put')
  async put(@Body(ALL) todoItem: TNgaTodoItem): Promise<IGetTodoItemResponse> {
    const result = await this.todoItemService.put(todoItem);
    return { success: true, message: 'OK', data: result };
  }
  @Get('/list')
  async list(): Promise<IGetTodoItemResponse> {
    const todoItems = await this.todoItemService.list();
    return { success: true, message: 'OK', data: todoItems };
  }
  @Del('/delete')
  async delete(@Query() id: number): Promise<IGetTodoItemResponse> {
    const todoItems = await this.todoItemService.delete(id);
    return { success: true, message: 'OK', data: todoItems };
  }


}
