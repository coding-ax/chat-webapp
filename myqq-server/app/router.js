'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  // 使用post进行注册 参数 username password(md5加密后的) date
  router.post('/user/register', controller.user.register);
};
