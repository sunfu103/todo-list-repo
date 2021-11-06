import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export type DefaultConfig = PowerPartial<EggAppConfig>;
export const swagger = {
  title: 'todo-list-repo',
  description: 'swagger-ui for midway api',
  version: '1.0.0',
  termsOfService: '',
  contact: {
    name: "API Support",
    url: "http://www.example.com/support",
    email: "support@example.com"
  },
  license: {
    name: "Apache 2.0",
    url: "https://www.apache.org/licenses/LICENSE-2.0.html"
  }
};

/**
 * 单数据库实例
 */
 export const orm = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '12345678',
  database: 'test',
  synchronize: false, // 如果第一次使用，不存在表，有同步的需求可以写 true
  logging: false,
};

export default (appInfo: EggAppInfo) => {
  const config = {} as DefaultConfig;

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1636166678001_1799';

  // add your config here
  config.middleware = ['reportMiddleware'];

  config.midwayFeature = {
    // true 代表使用 midway logger
    // false 或者为空代表使用 egg-logger
    replaceEggLogger: true,
  };

  // config.security = {
  //   csrf: false,
  // };

  return config;
};
