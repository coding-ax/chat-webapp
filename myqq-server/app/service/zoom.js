const Service = require('egg').Service
const moment = require('moment')

class Zoom extends Service {
    ZOOM_TABLE = 'zoom'
    // 一页返回的数据量
    pageSize = 10
    /**
     *
     * 返回分页数据 每页是10条
     * @param {number} page
     * @return {object[]} 
     * @memberof Zoom
     */
    async getZoomMessageByPage(page) {
        const { app } = this;
        page < 0 ? page = 0 : null;
        // 根据page执行对应sql
        const data = await app.mysql.query(`select * from ${this.ZOOM_TABLE} limit ?,?`, [(page - 1) * this.pageSize, page * this.pageSize])
        return data;
    }
    /**
     *
     * 插入新的zoom数据
     * @param {string} avator
     * @param {string} userID
     * @param {string} nickName
     * @param {string} contentText
     * @param {string} contentImgSrc
     * @memberof Zoom
     */
    async insertZoomMessage(avator, userID, nickName, contentText, contentImgSrc) {
        // 将数据插入
        const date = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
        const { app } = this;
        app.mysql.insert(this.ZOOM_TABLE, {
            avator,
            userID,
            nickName,
            contentImgSrc,
            contentText,
            date
        })
    }
}
module.exports = Zoom