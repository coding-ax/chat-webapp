// 处理socket中所有的添加，删除，同意申请等朋友事件
'use strict';

const Controller = require('egg').Controller;

class DefaultController extends Controller {
    // 主动发起添加
    async addFriend() {
        const { ctx, app } = this;
        // 所以我们需要的参数变成了： target(目标userID) message:{value:'要发送的内容',type:1} type:1 文字 type：2 图片
        const data = ctx.args[0];
        const { target } = data;
        this.ctx.socket.emit('res', { message: ctx.socket.userID, value: data })
    }
    // 同意
    async agreeFriend() {

    }
    // 获取好友清单
    async getFriendList() {

    }
}

module.exports = DefaultController;