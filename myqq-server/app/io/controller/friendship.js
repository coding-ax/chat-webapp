// 处理socket中所有的添加，删除，同意申请等朋友事件
'use strict';

const Controller = require('egg').Controller;

class DefaultController extends Controller {
    /**
     * 主动发起添加
     * 参数要求：{target:对方userID}
     * 触发信号 getAddFriend
     * 发送信号: addFriend 数据格式 {message：状态 status:状态}
     * @memberof DefaultController
     */
    async addFriend() {
        const { ctx } = this;
        const data = ctx.args[0];
        const { target } = data;
        // 根据target获取对方id 并插入数据库进行添加
        const message = await ctx.service.friend.addFriend(ctx.socket.userID, target);
        // 分发信号
        const targetSocket = await ctx.service.common.getTargetSocket(target)
        // 若在线就通知ta
        if (targetSocket) {
            const data = await this.ctx.service.friend.getFriendList(target)
            targetSocket.emit('friendList', {
                status: 'ok',
                data
            })
        }
        this.ctx.socket.emit('addFriend', { message, status: true })
    }

    /**
     *搜索friend 
     *参数要求：{keyword:userID或者名字}
     * @memberof DefaultController
     */
    async searchFriends() {
        const { ctx } = this;
        const data = ctx.args[0];
        const { keyword } = data;
        // keyword可以是userID也可以是名字
        const message = await ctx.service.friend.searchKey(keyword)
        ctx.socket.emit('searchFriend', {
            status: true,
            message
        })
    }

    /**
     * 同意添加
     * 数据要求 {target:对方id}
     * 分发数据：ok
     * @memberof DefaultController
     */
    async agreeFriend() {
        const { ctx } = this;
        const data = ctx.args[0];
        const { target } = data;
        await ctx.service.friend.addFriend(target, ctx.userID)
        const ans = await ctx.service.friend.getFriendList(ctx.userID)
        ctx.socket.emit('friendList', {
            data: ans,
            status: true
        })
        // 也通知对方
        const targerSocket = await ctx.service.friend.getTargetSocket(target)
        if (targerSocket) {
            ctx.socket.emit('friendList', {
                data: ans,
                status: true
            })
        }
    }
    // 
    /**
     *
     *获取好友清单(一并分发 从前端进行相关区分)
     * 信号 friendList 数据 {status data:好友列表}
     * 数据
     * @memberof DefaultController
     */
    async getFriendList() {
        // 根据在表中的数据查询好友
        const data = await this.ctx.service.friend.getFriendList(this.ctx.socket.userID)
        this.ctx.socket.emit('friendList', {
            status: 'ok',
            data
        })
    }

    async refuse() {
        //处理好友拒绝
        //删除对应的数据就行
    }
}

module.exports = DefaultController;