

import {Inject,Controller,Provide,Query,Get,Post,ALL,Body,Put,Del,Validate,} from '@midwayjs/decorator';
import { Context } from 'egg';
import { IGetTodoItemResponse } from '../interface';
import { TodoItemService } from '../service/todoItem';
import { TNgaTodoItem } from '../entity/TNgaTodoItem';
import { CreateApiDoc } from '@midwayjs/swagger'


@Provide()
@Controller('/api/todo', { middleware: [ 'reportMiddleware' ] })
export class APIController {
  @Inject()
  ctx: Context;

  @Inject()
  todoItemService: TodoItemService;

  /**
   * 
   * @param id todo list 的 id
   * @returns todo list 单个项目
   */
   @CreateApiDoc()
   .summary('查询单个todo')
   .description('根据id查询todo具体信息')
   .param('todo list 的 id', {
    required: true,
    example: '1'
   })
  .respond(200)
  .respond(302, 'redirect to another URL')
  .respond(201, 'response a text data', 'text', {
    headers: {
      'x-schema': {
        description: 'set a schema header',
        type: 'string'
      }
    },
    example: 'this is a reponse data'
  })
  .respond(500, 'error in response', 'json', {
    example: {
      a: 1
    }
  })
  .build()
  @Get('/get')
  async get(@Query() id: number): Promise<IGetTodoItemResponse> {
    if (id == null)
      throw new Error('id is null');
    const todoItems = await this.todoItemService.get(id);
    return { success: true, message: 'OK', data: todoItems };
  }

 
   @CreateApiDoc()
   .summary('保存todo')
   .description('填写todo信息保存到数据库中')
   .param('要保存的todo', {
    required: true,
    example: 'xxxxx'
   })
  .respond(200)
  .respond(302, 'redirect to another URL')
  .respond(201, 'response a text data', 'text', {
    headers: {
      'x-schema': {
        description: 'set a schema header',
        type: 'string'
      }
    },
    example: 'this is a reponse data'
  })
  .respond(500, 'error in response', 'json', {
    example: {
      a: 1
    }
  })
  .build()
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

  @CreateApiDoc()
   .summary('分页查询')
   .description('按todo名字模糊搜索，支持分页')
   .param('页码', {
    required: true,
    example: '2'
   })
   .param('每一页条数', {
    required: true,
    example: '10'
   })
  .respond(200)
  .respond(302, 'redirect to another URL')
  .respond(201, 'response a text data', 'text', {
    headers: {
      'x-schema': {
        description: 'set a schema header',
        type: 'string'
      }
    },
    example: 'this is a reponse data'
  })
  .respond(500, 'error in response', 'json', {
    example: {
      a: 1
    }
  })
  .build()
  @Get('/pager')
  async pager(@Query() num: number, @Query() size: number, @Query() name: string): Promise<IGetTodoItemResponse> {
    const todoItems = await this.todoItemService.pager(num, size, name);
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
