'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, io } = app;
  // router.get('/', controller.home.index);

  // 使用post进行注册 参数 username password(md5加密后的) date
  router.post('/user/register', controller.user.register);
  // 登录路由 参数与注册一致
  router.post('/user/login', controller.user.login);
  // 获取用户信息 参数：username
  router.get('/user/getInfo', app.jwt, controller.user.getInfo);

  // 图片上传 返回七牛云token
  router.get('/qiniutoken',app.jwt,controller.config.qiniuToken);

  // app.io.of('/') 单人聊天处理器
  // io.route('chat', io.controller.chat.chat);

  // 修改信息
  io.route('editUserDetail', io.controller.userEdit.editMessage);

  // 获取信息
  io.route('getDetail', io.controller.userEdit.getMessage);

  // 处理好友添加事件
  // io.route('addFriend', io.controller.friendship.addFriend)

  // 处理同意添加事件
  // io.route('agreeFriend', io.controller.friendship.agreeFriend)

};
