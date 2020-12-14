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
     * 返回所有朋友的userID
     * @param {String} userID
     * @return {String[]} friendList
     * @memberof Friends
     */
    async getFriendList(userID) {
        const adding = await this.app.mysql.query(`select ${this.FRIEND_TABLE}.userID,sender,friendID,birthday,avator,addTime,gender,nickName,status,signature from ${this.USER_DETAIL} join ${this.FRIEND_TABLE} on ${this.USER_DETAIL}.userID=${this.FRIEND_TABLE}.friendID where ${this.FRIEND_TABLE}.userID=? AND status=?`, [userID, 1])
        const added = await this.app.mysql.query(`select ${this.FRIEND_TABLE}.userID,sender,friendID,birthday,avator,addTime,gender,nickName,status,signature from ${this.USER_DETAIL} join ${this.FRIEND_TABLE} on ${this.USER_DETAIL}.userID=${this.FRIEND_TABLE}.friendID where ${this.FRIEND_TABLE}.userID=? AND status=?`, [userID, 2])
        return {
            added,
            adding
        }
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
        const check = await this.app.mysql.get(this.USER_TABLE, { userID: friendID })
        if (!check) {
            return { status: false, message: 'error:不存在friendID' }
        }
        // 避免重复插入产生错误
        const checkFriend = await this.app.mysql.get(this.FRIEND_TABLE, {
            userID: friendID,
            friendID: userID
        })
        if (checkFriend) {
            return {
                status: false,
                message: "已经发送过了"
            }
        }
        // 验证通过 可以进行插入
        const addTime = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
        // 插入 需要插入两条
        await this.app.mysql.insert(this.FRIEND_TABLE, [
            {
                userID,
                friendID,
                status: '1',
                addTime,
                sender: userID
            },
            {
                userID: friendID,
                friendID: userID,
                status: '1',
                addTime,
                sender: userID
            }
        ]
        );
        return {
            status: true,
            message: 'success:插入成功'
        }
    }


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
        const check = await this.app.mysql.get(this.FRIEND_TABLE, { userID, friendID });
        if (!check) {
            return {
                status: false,
                message: 'error:不存在申请记录'
            }
        }
        // 更改为通过申请
        // 同意好友申请同样需要改两条
        await this.app.mysql.query(`update friendship set status=? where userID=? and friendID=?`, ['2', userID, friendID]);
        await this.app.mysql.query(`update friendship set status=? where userID=? and friendID=?`, ['2', friendID, userID]);
        return {
            status: true,
            message: 'success:申请通过'
        }
    }

    /**
     * 
     * 通过keyword进行查询 返回对应信息数组
     * @param {string} keyword
     * @return {[]数组} 
     * @memberof Friends
     */
    async searchKey(keyword) {
        console.log(keyword);
        /** @array {data} */
        const data = await this.app.mysql.query(
            `select * from ${this.USER_DETAIL} where userID like ? OR nickName like ? OR userID in (select userID from ${this.USER_TABLE} where username like ?)`,
            [keyword, '%' + keyword + '%', '%' + keyword + '%']
        )
        // 去掉自己
        const ans = data.filter(item => {
            return item.userID != this.ctx.socket.userID
        })
        return ans;
    }


    /**
     *
     * 删除数据库中的朋友关系 
     * @param {string} userID
     * @param {string} friendID
     * @return {object} 
     * @memberof Friends
     */
    async deleteFriend(userID, friendID) {
        await this.app.mysql.delete(this.FRIEND_TABLE, {
            userID,
            friendID
        })
        await this.app.mysql.delete(this.FRIEND_TABLE, {
            userID: friendID,
            friendID: userID
        })
        return {
            status: true,
        }
    }
}
module.exports = Friends