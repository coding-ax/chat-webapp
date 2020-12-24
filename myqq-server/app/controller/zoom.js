const Controller = require('egg').Controller
class ZoomController extends Controller {
    /**
     * get请求
     * 获取分页
     * @memberof ZoomController
     */
    async getZoomByPage() {
        const { ctx } = this;
        // 获取page
        const { page } = ctx.request.query['page']
        const data = await ctx.service.zoom.getZoomMessageByPage(page);
        ctx.body = {
            data
        }
    }
    /**
     * post请求
     * 插入数据
     * @memberof ZoomController
     */
    async insertZoomMessage() {
        const { ctx } = this;
        // 获取userID和contentText和contentImgSrc
        const { userID, contentText, contentImgSrc } = ctx.request.body
        // 查询用户信息
        const userDetail = await ctx.service.user.getDataByUserID([userID])
        if (userDetail.length === 1) {
            const { nickName, avator } = userDetail[0];
            await ctx.service.zoom.insertZoomMessage(avator, userID, nickName, contentText, contentImgSrc)
            // 返回一个ok
            ctx.body = {
                message: '成功',
                status: true
            }
        }
        else {
            ctx.body = {
                message: 'userID出错',
                status: false,
            }
        }
    }
}
module.exports = ZoomController