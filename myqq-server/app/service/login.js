const Service = require('egg').Service;
const md5 = require('js-md5')
class LoginService extends Service {
    /**
     *
     * 通过username来检测数据库中是否存在该账户 有则返回对应数据
     * @param {String} username
     * @memberof LoginService
     */
    async checkLogin(username) {
        // 检测存在并返回相关数据
        let userInfo = await this.app.mysql.get('user', { username })
        if (userInfo) {
            return {
                isExist: true,
                userInfo
            }
        } else {
            return {
                isExist: false
            }
        }
    }
    /**
     *
     * 
     * @param {String} username
     * @param {String} password
     * @memberof LoginService
     */
    async addUser(username, password) {
        let userID = md5(username);
        const result = await this.app.mysql.insert('user', {
            username,
            password,
            userID
        })
        return {
            result
        }
    }
    /**
     *
     * 负责注册的业务逻辑
     * @param {String} username
     * @param {String} password
     * @return {Object} 
     * @memberof LoginService
     */
    async register(username, password) {
        // 检测是否有这个用户名 没有就准备插入
        let userStatus = await this.checkLogin(username)
        // 已经存在 返回存在结果并提示
        if (userStatus.isExist) {
            this.ctx.status = 200
            return {
                message: "用户名已经存在",
                status: false
            }
        }
        // 不存在则写入
        else {
            let result = await this.addUser(username, password);
            return {
                message: "注册成功",
                status: true,
                result
            }
        }


    }
}
module.exports = LoginService