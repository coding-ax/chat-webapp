// 此处路由为用户自定义相关信息的位置
'use strict';

const Controller = require('egg').Controller;

class DefaultController extends Controller {
    USER_DETAIL_table = 'user_detail'
    /**
     * 必须传回所有数据(包括userID)
     *
     * @memberof DefaultController
     */
    async editMessage() {
        // 获取ctx和app
        const { ctx, app } = this;
        // 获取传入的参数
        const data = ctx.args[0];
        await app.mysql.update(this.USER_DETAIL_table, data)
        // 分发信息
        app.socket.emit('res', {
            message: 'OK',
            status: true
        })

    }
}

module.exports = DefaultController;