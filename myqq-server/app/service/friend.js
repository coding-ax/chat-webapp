const Service = require('egg').Service;
// 时间处理库
const moment = require('moment')

// 继承Service
class Friends extends Service {
    USER_TABLE = 'user'
    FRIEND_TABLE = 'friendship'
    /**
     *
     * 返回所有朋友的userID
     * @param {String} userID
     * @return {String[]} friendList
     * @memberof Friends
     */
    async getFriendList(userID) {
        const result = await this.app.mysql.select(this.FRIEND_TABLE, {
            where: {
                userID
            },
            columns: ['friendID']
        })
        return result
    }

    /**
     * 添加好友
     * 根据userID和friendID生成好友记录 默认为已申请但是未添加
     * @param {String} userID
     * @param {String} friendID 
     * @return {{status:Boolean,message:String} } status:是否完成 message:原因短语
     * @memberof Friends
     */
    async addFriend(userID, friendID) {

        // 检查friendID是否是有效用户 userID不需要检查(来自token必定有效)
        const check = this.app.mysql.get(this.USER_TABLE, { userID: friendID })
        if (!check) {
            return { status: false, message: 'error:不存在friendID' }
        }
        // 验证通过 可以进行插入
        const addTime = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
        // 插入 需要插入两条
        await this.app.mysql.insert(this.FRIEND_TABLE, [
            {
                userID,
                friendID,
                status: '1',
                addTime
            },
            {
                userID: friendID,
                friendID: userID,
                status: '1',
                addTime
            }
        ]
        );
        return {
            status: true,
            message: 'success:插入成功'
        }
    }

    // 同意好友申请同样需要改两条
    /**
     *
     * 同意好友申请
     * @param {String} userID
     * @param {String} friendID
     * @return {{status:Boolean,message:String}} 
     * @memberof Friends
     */
    async agree(userID, friendID) {
        // 先检查记录存在 检查一条即可
        const check = this.app.mysql.get(this.FRIEND_TABLE, { userID, friendID });
        if (!check) {
            return {
                status: false,
                message: 'error:不存在申请记录'
            }
        }
        // 更改为通过申请
        await this.app.mysql.query(`update friendship set status=? where userID=? and friendID=?`, ['2', userID, friendID]);
        await this.app.mysql.query(`update friendship set status=? where userID=? and friendID=?`, ['2', friendID, userID]);
        return {
            status: true,
            message: 'success:申请通过'
        }
    }
}
module.exports = Friends