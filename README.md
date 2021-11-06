create database test;
use test;

create table t_nga_todo_user
(
    id          int                                   not null comment '主键'
        primary key,
    username    varchar(20) default ''                null comment '用户名',
    password    varchar(20) default ''                null comment '密码',
    create_time datetime    default CURRENT_TIMESTAMP not null comment '创建时间',
    update_time datetime    default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP comment '修改时间',
    is_delete   int         default 0                 not null comment '是否已删除，0：未删除，1：已删除'
)
comment 'todo list 项目用户表';


create table t_nga_todo_item
(
    id                    int                                   not null comment '主键'
        primary key,
    name                  varchar(20) default ''                null comment 'todo项目',
    owner                 int         default 0                 not null comment '负责人，关联user表的id',
    status                int         default 0                 not null comment '状态，0：未开始，1：进行中，2：已完成',
    estimated_finish_time datetime    default CURRENT_TIMESTAMP not null comment '预计完成时间',
    real_finish_time      datetime    default CURRENT_TIMESTAMP not null comment '实际完成时间',
    create_time           datetime    default CURRENT_TIMESTAMP not null comment '创建时间',
    update_time           datetime    default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP comment '修改时间',
    is_delete             int         default 0                 not null comment '是否已删除，0：未删除，1：已删除'
)
comment 'todo list 项目表';