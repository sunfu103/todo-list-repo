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

  async update(todoItem: TNgaTodoItem) {
    let tmp = await this.todoItemModel.findOne(1);
    tmp[0].status = todoItem.status
    tmp[0].name = todoItem.name
    return this.todoItemModel.save(tmp[0]);
  }

  async delete(id: number) {
    return await this.todoItemModel.delete(id);
  }

  async list() {
    return await this.todoItemModel.find();
  }

  async pager(num: number, size: number, name: string) {
   let queryBuilder =await this.todoItemModel
      .createQueryBuilder("todo");
   if (name!== undefined && name!= ''){
     queryBuilder
       .where("todo.name like :name", { name:`%${name}%` })
   }
    return queryBuilder
      .orderBy("todo.id", "DESC")
      .skip((num-1)*size)
      .take(size)
      .getMany();
  }

}
