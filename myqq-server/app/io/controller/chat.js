// {app_root}/app/io/controller/default.js
'use strict';

const Controller = require('egg').Controller;

class DefaultController extends Controller {
  async ping() {
    const { ctx, app } = this;
    const message = ctx.args[0];
    // 抽离参数获取目标发送用户
    const { userID, target } = message;
    // 获取房间总socket
    let conn = app.io.of('/')
    // 找到要发送的目标用户 并进行发送
    conn.clients(async (error, clients) => {
      if (error) throw error;
      for (let client of clients) {
        // 找到了就发送消息并且退出
        if (conn.sockets[client].handshake.query.userID === target) {
          await conn.sockets[client].emit('res', message.value)
          break;
        }
      }
    });
    // 做对应数据的存储 但是不需要同步等待
    // app.mysql.insert('')
    // 分发响应
    await ctx.socket.emit('res', 'ok');
  }
}

module.exports = DefaultController;