import { Provide } from '@midwayjs/decorator';
import { Repository } from 'typeorm';
import { InjectEntityModel } from '@midwayjs/orm';
import { TNgaTodoItem } from '../entity/TNgaTodoItem';

@Provide()
export class TodoItemService {

  @InjectEntityModel(TNgaTodoItem)
  todoItemModel: Repository<TNgaTodoItem>;

  async get(id: number) {
    const todoItem = new TNgaTodoItem();
    todoItem.id = id;
    return await this.todoItemModel.find(todoItem);
  }

  async save(todoItem: TNgaTodoItem) {
    return await this.todoItemModel.save(todoItem);
  }

  async put(todoItem: TNgaTodoItem) {
    return this.todoItemModel.save(todoItem);
  }

  async delete(id: number) {
    return await this.todoItemModel.delete(id);
  }

  async list() {
    return await this.todoItemModel.find();
  }
}
