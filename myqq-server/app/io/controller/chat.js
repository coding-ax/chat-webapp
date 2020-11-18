// {app_root}/app/io/controller/default.js
'use strict';

const Controller = require('egg').Controller;

class DefaultController extends Controller {
  async ping() {
    const { ctx, app } = this;
    // 所以我们需要的参数变成了： target(目标userID) message:{value:'要发送的内容',type:1} type:1 文字 type：2 图片
    const data = ctx.args[0];
    const { target, message } = data;
    // 参数缺失则分发错误
    if (!target || !message) {
      ctx.socket.emit('404', { message: '参数缺失', status: false })
      return;
    }
    // 从当前连接中获取userID
    const userID = ctx.socket.userID;
    // 抽离参数获取目标发送用户
    // 从message里面获取信息：
    // 连接后就已经获取到UserID并挂载到了ctx.socket上 参见../middleware/auth.js line 25
    console.log(userID, target)
    console.log(message)
    // 获取当前房间总socket
    let conn = app.io.of('/')
    // 找到要发送的目标用户 并进行发送
    let messageStatus = '1';
    conn.clients(async (error, clients) => {
      if (error) throw error;
      for (let client of clients) {
        // 找到了就发送消息并且退出
        console.log(conn.sockets[client].userID, target)
        if (conn.sockets[client].userID === target) {
          await conn.sockets[client].emit('res', { message })
          break;
        }
      }
    });
    // 做对应数据的存储 但是不需要同步等待
    // app.mysql.insert('')
    // 分发响应
    await ctx.socket.emit('res', { message: { value: `发送给${target}:${message.value}:发送成功` } });
  }
}

module.exports = DefaultController;