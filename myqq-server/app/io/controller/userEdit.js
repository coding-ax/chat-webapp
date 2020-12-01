// 此处路由为用户自定义相关信息的位置
'use strict';

const Controller = require('egg').Controller;

class DefaultController extends Controller {
    USER_DETAIL_table = 'user_detail'
    /**
     * 必须传回所有数据(包括userID)
     * 分发两个信号 res 成功 error 失败
     * @memberof DefaultController
     */
    async editMessage() {
        // 获取ctx和app
        const { ctx, app } = this;
        // 获取传入的参数
        const data = ctx.args[0];
        console.log(data)
        // data必须完整 否则返回错误
        console.log("用户信息修改触发")
        try {
            await app.mysql.update(this.USER_DETAIL_table, data, {
                where: {
                    userID: data.userID
                }
            })
            ctx.socket.emit('res', { message: '修改成功', status: true })
            ctx.socket.emit('detail', { message: data, status: true })
        } catch (error) {
            ctx.socket.emit('error', { message: '参数错误', status: false })
        }
    }
    /**
     * 触发信号getDetail
     * 返回信号detail 
     * 
     * @memberof DefaultController
     */
    async getMessage() {
        const { ctx, app } = this;
        // 获取传入的参数
        console.log("获取用户信息")
        const data = await app.mysql.get(this.USER_DETAIL_table, {
            userID: ctx.socket.userID
        })
        ctx.socket.emit('detail', {
            message: data,
            status: true
        })
    }
}

module.exports = DefaultController;