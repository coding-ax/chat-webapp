
const Controller = require('egg').Controller

class UserController extends Controller {
    // 注册
    async register() {
        const { ctx } = this;
        // 获取时间 用户名和密码来进行验证
        const { username, password } = ctx.query
        const data = await ctx.service.login.register(username, password);
        ctx.body = {
            data
        }
    }
    // 获取用户信息
    async getInfo() {
        const { ctx } = this;
        // 获取时间 用户名和密码来进行验证
        const { username, password } = ctx.query
        const data = await ctx.service.login.getInfo(username);
        ctx.body = {
            data
        }
    }
    // 登录
    async login() {
        const { ctx } = this;
        // 获取时间 用户名和密码来进行验证
        const { username, password } = ctx.query
        console.log(username,password)
        const data = await ctx.service.login.login(username, password);
        ctx.body = {
            data
        }
    }
}
module.exports = UserController