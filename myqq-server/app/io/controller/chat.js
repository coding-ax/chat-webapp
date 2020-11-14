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
    conn.clients((error, clients) => {
      if (error) throw error;
      console.log(clients); // => [PZDoMHjiu8PYfRiKAAAF, Anw2LatarvGVVXEIAAAD]
      for (let client of clients) {
        if (conn.sockets[client].handshake.query.userID === target) {
          conn.sockets[client].emit('res', message.value)
          break;
        }

      }
    });

    // 分发响应
    await ctx.socket.emit('res', 'ok');
  }
}

module.exports = DefaultController;