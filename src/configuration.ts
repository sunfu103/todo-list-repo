import { App, Configuration } from '@midwayjs/decorator';
import { ILifeCycle } from '@midwayjs/core';
import { Application } from 'egg';
import { join } from 'path';
import * as swagger from '@midwayjs/swagger';
import * as orm from '@midwayjs/orm';

@Configuration({
  imports: [
    swagger
  ]
})
export class ContainerConfiguration {

}
@Configuration({
  imports:[orm],
  importConfigs: [join(__dirname, './config')],
  conflictCheck: true,
})
export class ContainerLifeCycle implements ILifeCycle {
  @App()
  app: Application;

  async onReady() {}
}
