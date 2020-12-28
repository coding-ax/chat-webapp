
const Controller = require('egg').Controller
const qiniu = require('qiniu')
class ConfigController extends Controller {
    async qiniuToken() {
        const { ctx } = this;
        // 自己的七牛云accesskey和secretKey
        const accessKey = 'your accesskey'
        const secretKey = 'your secretKey'
        const mac = new qiniu.auth.digest.Mac(accessKey, secretKey)
        // scope仓库名称
        const options = {
            scope: 'your zoom'
        }
        const putPolicy = new qiniu.rs.PutPolicy(options)
        const token = putPolicy.uploadToken(mac)
        const key = '' + new Date() + Math.random().toString(16).slice(2);
        const data = {
            token,
            key
        }
        ctx.body = {
            code: 200,
            status: "ok",
            data
        }
    }
}
module.exports = ConfigController