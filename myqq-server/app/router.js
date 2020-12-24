'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, io } = app;
  router.get('/', controller.home.index);

  // 使用post进行注册 参数 username password(md5加密后的) date
  router.post('/user/register', controller.user.register);
  // 登录路由 参数与注册一致
  router.post('/user/login', controller.user.login);
  // 获取用户信息 参数：username
  router.get('/user/getInfo', app.jwt, controller.user.getInfo);
  // 根据userID获取用户信息
  router.post('/user/getInfoByID', app.jwt, controller.user.getInfoByUserID);
  // 图片上传 返回七牛云token
  router.get('/qiniutoken', app.jwt, controller.config.qiniuToken);
  // 返回zoom的数据
  router.get('/zoom/getData', app.jwt, controller.zoom.getZoomByPage)
  // 插入zoom的数据
  router.post('/zoom/addZoom', app.jwt, controller.zoom.insertZoomMessage)

  // websocket:
  // 修改信息
  io.route('editUserDetail', io.controller.userEdit.editMessage);

  // 获取信息
  io.route('getDetail', io.controller.userEdit.getMessage);

  // 获取好友列表 getFriendList - friendList
  io.route('getFriendList', io.controller.friendship.getFriendList);

  // 搜索好友 getSearchFriend-searchFriend
  io.route('getSearchFriend', io.controller.friendship.searchFriends);
  // 处理好友添加事件 getAddFriend-friendList 还有addFriend
  io.route('getAddFriend', io.controller.friendship.addFriend)

  // 处理同意添加事件 getAgreeFriend-friendList
  io.route('getAgreeFriend', io.controller.friendship.agreeFriend)
  // 处理好友拒绝/删除事件
  io.route('getDeleteFriend', io.controller.friendship.deleteFriend)

  // p2p聊天
  // 聊天
  io.route('chat2target', io.controller.chat.chat2target)
  // 获取聊天记录
  io.route('getTargetChatMessage', io.controller.chat.getTargetChatMessage)
  // 获取对方信息
  io.route('getUserDetailByUserIDs', io.controller.detail.getUserDetailByUserIDs)
};
