'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, io } = app;
  // router.get('/', controller.home.index);

  // 用户相关路由
  // 使用post进行注册 参数 username password(md5加密后的) date
  router.post('/user/register', controller.user.register);
  // 登录路由 参数与注册一致
  router.post('/user/login', controller.user.login);
  // 获取用户信息 参数：username
  router.get('/user/getInfo', app.jwt, controller.user.getInfo);

  // app.io.of('/') 单人聊天处理器
  io.route('chat', io.controller.chat.chat);

  // 处理好友添加事件
  io.route('addFriend', io.controller.friendship.addFriend)

  // 处理同意添加事件
  io.route('agreeFriend', io.controller.friendship.agreeFriend)

  // 处理信息编辑
  // io.route('editDetail', () => { })
  // 获取好友列表
  // io.route('getFriend', io.controller.friendship.getFriendList)
};
