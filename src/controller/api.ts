import {Inject, Controller, Provide, Query, Get, Post, ALL, Body, Put, Del, Validate,} from '@midwayjs/decorator';
import {Context} from 'egg';
import {IGetTodoItemResponse} from '../interface';
import {TodoItemService} from '../service/todoItem';
import {TNgaTodoItem} from '../entity/TNgaTodoItem';
import {CreateApiDoc} from '@midwayjs/swagger'


@Provide()
@Controller('/api/todo', {middleware: ['reportMiddleware']})
export class APIController {
  @Inject()
  ctx: Context;

  @Inject()
  todoItemService: TodoItemService;

  @Inject()
  logger;


  @CreateApiDoc()
    .summary('根据id查询单个todo')
    .param('todo id', {required: true, example: '1'})
    .respond(200, 'success in response')
    .respond(500, 'error in response')
    .build()
  @Get('/get-todo')
  async get(@Query() id: number): Promise<IGetTodoItemResponse> {
    if (!id || isNaN(id)) {
      this.logger.warn('id invalid')
      return {success: false, message: 'id invalid', data: null};
    }
    try {
      const todoItems = await this.todoItemService.get(id);
      return {success: true, message: 'OK', data: todoItems};
    } catch (e) {
      return {success: false, message: 'ERROR', data: e.message};
    }
  }


  @CreateApiDoc()
    .summary('新增todo信息保存到数据库')
    .param('要新增的todo', {required: true, example: '{"name":"test-todo","status":2,"owner":2}'})
    .respond(200, 'success in response')
    .respond(500, 'error in response')
    .build()
  @Post('/save-todo')
  @Validate()
  async save(@Body(ALL) todoItem: TNgaTodoItem): Promise<IGetTodoItemResponse> {
    try {
      const result = await this.todoItemService.save(todoItem);
      return {success: true, message: 'OK', data: result};
    } catch (e) {
      return {success: false, message: 'ERROR', data: e.message};
    }
  }

  @CreateApiDoc()
  .summary('修改单个todo的内容')
  .param('要修改的todo', {required: true, example: '{"name":"xxx","status":2,"owner":1}'})
  .respond(200, 'success in response')
  .respond(500, 'error in response')
  .build()
  @Put('/put-todo')
  @Validate()
  async put(@Body(ALL) todoItem: TNgaTodoItem): Promise<IGetTodoItemResponse> {
    try {
      const result = await this.todoItemService.put(todoItem);
      return {success: true, message: 'OK', data: result};
    } catch (e) {
      return {success: false, message: 'ERROR', data: e.message};
    }
  }

  @CreateApiDoc()
  .summary('废弃，请使用put-todo')
  .build()
  @Post('/update-todo-status')
  @Validate()
  async update(@Query() id: number, @Query() status: number): Promise<IGetTodoItemResponse> {
    if (!id || !status || isNaN(id) || isNaN(status)) {
      this.logger.warn(this.ctx.path, 'id or status invalid')
      return {success: false, message: 'id or status invalid', data: null};
    }
    try {
      const result = await this.todoItemService.update_status(id, status);
      return {success: true, message: 'OK', data: result};
    } catch (e) {
      return {success: false, message: 'ERROR', data: e.message};
    }
  }

  @CreateApiDoc()
  .summary('查询所有的todo')
  .respond(200, 'success in response')
  .respond(500, 'error in response')
  .build()
  @Get('/list-todos')
  async list(): Promise<IGetTodoItemResponse> {
    try {
      const todoItems = await this.todoItemService.list();
      return {success: true, message: 'OK', data: todoItems};
    } catch (e) {
      return {success: false, message: 'ERROR', data: e.message};
    }
  }

  @CreateApiDoc()
    .summary('按todo名字模糊搜索，支持分页')
    .param('页码', {required: true, example: '2'})
    .param('每一页条数', {required: true, example: '10'})
    .param('模糊搜索的todo项目名称', {required: false, example: '明日10点'})
    .respond(200, 'success in response', 'josn', {})
    .respond(500, 'error in response')
    .build()
  @Get('/query-todos')
  async pager(@Query() num: number, @Query() size: number,@Query() name: string): Promise<IGetTodoItemResponse> {
    if (!num || isNaN(num) || !size || isNaN(size)) {
      this.logger.warn('num or size invalid')
      return {success: false, message: 'num or size invalid', data: null};
    }
    try {
      const todoItems = await this.todoItemService.pager(num, size, name);
      return {success: true, message: 'OK', data: todoItems};
    } catch (e) {
      return {success: false, message: 'ERROR', data: e.message};
    }
  }

  @CreateApiDoc()
    .summary('根据id删除单个todo')
    .param('todo id', {required: true, example: '1'})
    .respond(200, 'success in response')
    .respond(500, 'error in response')
    .build()
  @Del('/delete-todo')
  async delete(@Query() id: number): Promise<IGetTodoItemResponse> {
    if (!id || isNaN(id)) {
      this.logger.warn(this.ctx.path, 'id invalid')
      return {success: false, message: 'id invalid', data: null};
    }
    try {
      const todoItems = await this.todoItemService.delete(id);
      return {success: true, message: 'OK', data: todoItems};
    } catch (e) {
      return {success: false, message: 'ERROR', data: e.message};
    }
  }


}
