

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
  Validate,
 } from '@midwayjs/decorator';
import { Context } from 'egg';
import { IGetUserResponse } from '../interface';
import { IGetTodoItemResponse } from '../interface';
import { TodoItemService } from '../service/todoItem';
import { TNgaTodoItem } from '../entity/TNgaTodoItem';
import { UserService } from '../service/user';


@Provide()
@Controller('/api', { middleware: [ 'reportMiddleware' ] })
export class APIController {
  @Inject()
  ctx: Context;

  @Inject()
  userService: UserService;

  @Inject()
  todoItemService: TodoItemService;

  @Post('/user/get_user', { middleware: [ 'reportMiddleware' ] })
  async getUser(@Query() uid: string): Promise<IGetUserResponse> {
    const user = await this.userService.getUser({ uid });
    console.log("------getUser------");
    return { success: true, message: 'OK', data: user };
  }

  @Get('/todo/get')
  async get(@Query() id: number): Promise<IGetTodoItemResponse> {
    const todoItems = await this.todoItemService.get(id);
    return { success: true, message: 'OK', data: todoItems };
  }

  @Post('/todo/save')
  @Validate()
  async save(@Body(ALL) todoItem: TNgaTodoItem): Promise<IGetTodoItemResponse> {
    const result = await this.todoItemService.save(todoItem);
    return { success: true, message: 'OK', data: result };
  }

  @Put('/todo/put')
  async put(@Body(ALL) todoItem: TNgaTodoItem): Promise<IGetTodoItemResponse> {
    const result = await this.todoItemService.put(todoItem);
    return { success: true, message: 'OK', data: result };
  }
  @Get('/todo/list')
  async list(): Promise<IGetTodoItemResponse> {
    const todoItems = await this.todoItemService.list();
    return { success: true, message: 'OK', data: todoItems };
  }
  @Del('/todo/delete')
  async delete(@Query() id: number): Promise<IGetTodoItemResponse> {
    const todoItems = await this.todoItemService.delete(id);
    return { success: true, message: 'OK', data: todoItems };
  }


}
