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
import {Context} from 'egg';
import {IGetTodoItemResponse} from '../interface';
import {TodoItemService} from '../service/todoItem';
import {TNgaTodoItem} from '../entity/TNgaTodoItem';


@Provide()
@Controller('/api/todo', {middleware: ['reportMiddleware']})
export class APIController {
  @Inject()
  ctx: Context;

  @Inject()
  todoItemService: TodoItemService;

  @Inject()
  logger;

  @Get('/get')
  async get(@Query() id: number): Promise<IGetTodoItemResponse> {

    if (id == null || typeof id !== "number") {
      this.logger.warn('id is null')
      return {success: false, message: 'id is null', data: null}
    }
    try {
      const todoItems = await this.todoItemService.get(id);
      return {success: true, message: 'OK', data: todoItems};
    } catch (e) {
      return {success: false, message: 'ERROR', data: e}
    }
  }

  @Post('/save')
  @Validate()
  async save(@Body(ALL) todoItem: TNgaTodoItem): Promise<IGetTodoItemResponse> {
    try {
      const result = await this.todoItemService.save(todoItem);
      return {success: true, message: 'OK', data: result};
    } catch (e) {
      return {success: false, message: 'ERROR', data: e}
    }
  }


  @Put('/put')
  @Validate()
  async put(@Body(ALL) todoItem: TNgaTodoItem): Promise<IGetTodoItemResponse> {
    try {
      const result = await this.todoItemService.put(todoItem);
      return {success: true, message: 'OK', data: result};
    } catch (e) {
      return {success: false, message: 'ERROR', data: e}
    }
  }

  @Get('/list')
  async list(): Promise<IGetTodoItemResponse> {
    try {
      const todoItems = await this.todoItemService.list();
      return {success: true, message: 'OK', data: todoItems};
    } catch (e) {
      return {success: false, message: 'ERROR', data: e}
    }
  }

  @Del('/delete')
  async delete(@Query() id: number): Promise<IGetTodoItemResponse> {
    if (id == null || typeof id !== "number") {
      this.logger.warn('id is null')
      return {success: false, message: 'id is null', data: null}
    }
    try {
      const todoItems = await this.todoItemService.delete(id);
      return {success: true, message: 'OK', data: todoItems};
    } catch (e) {
      return {success: false, message: 'ERROR', data: e}
    }
  }


}
