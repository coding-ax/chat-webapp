// 用来获取一些用户信息相关的内容
'use strict'
const Controller = require('egg').Controller

class DefaultController extends Controller {
    /**
     * 事件触发：getUserDetailByUserIDs 根据数组获取对应的userID
     * 分发事件emit: userDetail:[]
     *
     * @memberof DefaultController
     */
    async getMessage() {
        const { ctx } = this;
        const data = ctx.args[0];

    }
}
module.exports = DefaultController