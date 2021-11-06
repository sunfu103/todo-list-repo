import { Column } from "typeorm";
import { EntityModel } from "@midwayjs/orm";

@EntityModel("t_nga_todo_item", { schema: "test" })
export class TNgaTodoItem {
  @Column("int", { primary: true, name: "id", comment: "主键" })
  id: number;

  @Column("varchar", {
    name: "name",
    nullable: true,
    comment: "todo项目",
    length: 20,
  })
  name: string | null;

  @Column("int", {
    name: "owner",
    comment: "负责人，关联user表的id",
    default: () => "'0'",
  })
  owner: number;

  @Column("int", {
    name: "status",
    comment: "状态，0：未开始，1：进行中，2：已完成",
    default: () => "'0'",
  })
  status: number;

  @Column("datetime", {
    name: "estimated_finish_time",
    comment: "预计完成时间",
    default: () => "CURRENT_TIMESTAMP",
  })
  estimated_finish_time: Date;

  @Column("datetime", {
    name: "real_finish_time",
    comment: "实际完成时间",
    default: () => "CURRENT_TIMESTAMP",
  })
  real_finish_time: Date;

  @Column("datetime", {
    name: "create_time",
    comment: "创建时间",
    default: () => "CURRENT_TIMESTAMP",
  })
  create_time: Date;

  @Column("datetime", {
    name: "update_time",
    comment: "修改时间",
    default: () => "CURRENT_TIMESTAMP",
  })
  update_time: Date;

  @Column("int", {
    name: "is_delete",
    comment: "是否已删除，0：未删除，1：已删除",
    default: () => "'0'",
  })
  is_delete: number;
}
