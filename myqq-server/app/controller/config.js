
const Controller = require('egg').Controller
const qiniu = require('qiniu')
class ConfigController extends Controller {
    async qiniuToken() {
        const { ctx, app } = this;
        // 自己的七牛云accesskey和secretKey
        const accessKey = app.config.qiniuConfig.accessKey
        const secretKey =app.config.qiniuConfig.secretKey
        const mac = new qiniu.auth.digest.Mac(accessKey, secretKey)
        // scope仓库名称
        const options = {
            scope: app.config.qiniuConfig.scope
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