/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // 去掉post的时候的安全策略中的csrf提示
  config.security = {
    xframe: {
      enable: false
    },
    // 去除csrf提示
    csrf: {
      enable: false
    },
    // 配置全局白名单
    domainWhiteList: ['*']
  }

  // 配置跨域
  config.cors = {
    origin: "*",
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS'
  }

  // 安装egg-cors来允许跨域 :npm install egg-cors /yarn add egg-cors 
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1605081693784_8942';

  //配置jwt
  config.jwt = {
    secret: "ax666" // secret key 自定义配置的token加密字符串
  }
  //提高文件上传大小限制
  config.bodyParser = {
    jsonLimit: '100mb',
    formLimit: '100mb',
  }
  // add your middleware config here
  config.middleware = [];

  // mysql配置信息
  config.mysql = {
    // 单数据库信息配置
    client: {
      // host
      host: '127.0.0.1',
      // 端口号
      port: '3306',
      // 用户名
      user: 'root',
      // 密码
      password: '123456',
      // 数据库名
      database: 'myqq_server',
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  };
  //导入socket.io
  config.io = {
    init: {},
    namespace: {
      '/': {
        connectionMiddleware: ['auth'],
        // connectionMiddleware: [],
        // packetMiddleware: ['filter'],
        packetMiddleware: ['test'],
      },
      '/chat': {
        connectionMiddleware: ['auth'],
        // connectionMiddleware: [],
        packetMiddleware: [],
      },
    },
  };
  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };



  return {
    ...config,
    ...userConfig,
  };
};
