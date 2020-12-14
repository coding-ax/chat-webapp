const Service = require('egg').Service;
// 时间处理库
const moment = require('moment')

// 继承Service
class Friends extends Service {
    USER_TABLE = 'user'
    FRIEND_TABLE = 'friendship'
    USER_DETAIL = 'user_detail'
    /**
     *
     * 通过userID[] 获取用户detail信息
     * @param {string[]} userIDList
     * @return {data:用户信息} 
     * @memberof Friends
     */
    async getDataByUserID(userIDList) {
        const { app } = this;
        let data = []
        for (const userID of userIDList) {
            const friendDetail = await app.mysql.get(this.USER_DETAIL, {
                userID
            })
            data.push(friendDetail)
        }
        return data;
    }
}
module.exports = Friends