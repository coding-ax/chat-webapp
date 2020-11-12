
const Controller = require('egg').Controller

class UserController extends Controller {
    async register() {
        const { ctx } = this;
        // 获取时间 用户名和密码来进行验证
        const { username, password, date } = ctx.query
        const data = await ctx.service.login.register(username, password);
        ctx.body = {
            message: "注册成功",
            username,
            password,
            date,
            data
        }
    }
}
module.exports = UserController