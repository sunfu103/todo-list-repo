# 如何启动项目

> 1、设备及环境信息
```
开发环境: mac，vscode
数据库: mysql 8.0.23
Nodejs: v16.13.0 to /usr/local/bin/node
npm: v8.1.0 to /usr/local/bin/npm
```

> 2、初始化数据库
```
mysql账号密码在src/config/config.default.ts中，切换成自己的即可

-- 创建数据库
create database test;
use test;

-- 创建表
create table t_nga_todo_user
(
    id          int                                   not null comment '主键'
        primary key AUTO_INCREMENT,
    username    varchar(20) default ''                null comment '用户名',
    password    varchar(20) default ''                null comment '密码',
    create_time datetime    default CURRENT_TIMESTAMP not null comment '创建时间',
    update_time datetime    default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP comment '修改时间',
    is_delete   int         default 0                 not null comment '是否已删除，0：未删除，1：已删除'
)
comment 'todo list 项目用户表';

-- 创建表
create table t_nga_todo_item
(    id                    int                                   not null comment '主键'
        primary key AUTO_INCREMENT,
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
```


> 3、安装相关的npm组件

```
安装orm组件
npm i @midwayjs/orm typeorm --save
安装数据库驱动
npm install mysql --save
```

> 4、启动本地项目
```
$ npm run dev

> my-midway-project@1.0.0 dev
> cross-env ets && cross-env NODE_ENV=local midway-bin dev --ts

[ Midway ] Start Server at  http://127.0.0.1:7001
[ Midway ] Start on LAN http://192.168.0.103:7001

```

> 5、查看swagger接口文档，访问下面的地址
```
http://127.0.0.1:7001/swagger-ui/index.html
```

> 6、使用postman测试接口，导入下面的json即可

```

```

> 7、执行单元测试
```
$ npm run test
```