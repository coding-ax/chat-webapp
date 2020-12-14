// 处理好友聊天事件 chat
'use strict';

const Controller = require('egg').Controller;
const moment = require('moment')

class DefaultController extends Controller {
  async chat() {
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
          // 已经发送
          messageStatus = '2';
          break;
        }
      }
      // 做对应数据的存储 
      ctx.service.message.insertMessage(userID, target, message.value, message.type, messageStatus)
    });


    ctx.socket.emit('res', { message: { value: `发送给${target}:${message.value}:发送成功` } });
  }



  /**
   *
   * 重新编写的聊天事件 由chat2target发起 针对对方发起message事件 针对发起者发起send事件
   * 要求数据为 {target:对方userID,message:{value:要发送的信息(两种，图片链接和文字),type:1文字 2图片}}
   * 分发 message消息给对方（online）+  
   * @return {null} 
   * @memberof DefaultController
   */
  async chat2target() {
    const { ctx } = this;
    // 所以我们需要的参数变成了： target(目标userID) message:{value:'要发送的内容',type:1} type:1 文字 type：2 图片
    const data = ctx.args[0];
    const { target, message } = data;
    console.log(target, message)
    // 参数缺失则分发错误
    if (!target || !message) {
      ctx.socket.emit('404', { message: '参数缺失', status: false })
      return;
    }
    // 从当前连接中获取用户的userID
    const userID = ctx.socket.userID;
    const targetSocket = await ctx.service.common.getTargetSocket(target)
    // 连接存在
    if (targetSocket) {
      targetSocket.emit('message', {
        recevier: target,
        dispatcher: userID,
        messageValue: message.value,
        messageType: message.type,
        date: moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
      })
      ctx.socket.emit('send', {
        message: "发送成功",
        status: true,
        online: true,
        date: moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
      })
      await ctx.service.message.insertMessage(userID, target, message.value, message.type, 2);
    } else {
      // 当前连接不存在，则只进行存储等待下次其登录时发送
      ctx.socket.emit('send', {
        message: "发送成功",
        status: true,
        online: false,
        date: moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
      })
      await ctx.service.message.insertMessage(userID, target, message.value, message.type, 1);
    }

  }

  // 获取target聊天记录
  /**
   * 需要target参数：
   * 触发信号 targetChatMessage
   * @memberof DefaultController
   */
  async getTargetChatMessage() {
    const { ctx } = this;
    const data = ctx.args[0];
    const { target } = data;
    const userID = ctx.socket.userID;
    const messageList = await ctx.service.message.getAllMessageWithTarget(userID, target);
    ctx.socket.emit('targetChatMessage', {
      messageList
    })
  }
}

module.exports = DefaultController;