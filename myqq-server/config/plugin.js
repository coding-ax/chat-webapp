'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }
  // 配置mysql
  mysql: {
    enable: true,
    package: 'egg-mysql',
  },
  // 配置cors 允许跨域
  cors: {
    enable: true,
    package: 'egg-cors'
  }
};
