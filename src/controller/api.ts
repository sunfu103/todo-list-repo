

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
import { IGetTodoItemResponse } from '../interface';
import { TodoItemService } from '../service/todoItem';
import { TNgaTodoItem } from '../entity/TNgaTodoItem';


@Provide()
@Controller('/api/todo', { middleware: [ 'reportMiddleware' ] })
export class APIController {
  @Inject()
  ctx: Context;

  @Inject()
  todoItemService: TodoItemService;

  @Get('/get')
  async get(@Query() id: number): Promise<IGetTodoItemResponse> {
    if (id == null)
      throw new Error('id is null');
    const todoItems = await this.todoItemService.get(id);
    return { success: true, message: 'OK', data: todoItems };
  }

  @Post('/save')
  @Validate()
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
    if (id == null )
      throw new Error('id is null');
    const todoItems = await this.todoItemService.delete(id);
    return { success: true, message: 'OK', data: todoItems };
  }


}
