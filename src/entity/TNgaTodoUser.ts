import { Column, PrimaryGeneratedColumn } from "typeorm";
import { EntityModel } from "@midwayjs/orm";

@EntityModel("t_nga_todo_user", { schema: "test" })
export class TNgaTodoUser {
  @PrimaryGeneratedColumn({ type: "int", name: "id", comment: "主键" })
  id: number;

  @Column("varchar", {
    name: "username",
    nullable: true,
    comment: "用户名",
    length: 20,
  })
  username: string | null;

  @Column("varchar", {
    name: "password",
    nullable: true,
    comment: "密码",
    length: 20,
  })
  password: string | null;

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
