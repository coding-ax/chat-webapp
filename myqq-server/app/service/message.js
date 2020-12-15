const Service = require('egg').Service;
// 时间处理库
const moment = require('moment')

// 继承Service
class Friends extends Service {
    MESSAGE_TABLE = 'p2p_message';
    /**
     *
     * 往聊天记录表里插入聊天记录
     * @param {String} dispatcher
     * @param {String} recevier
     * @param {String} messageValue
     * @param {String} messageType
     * @param {String} messageStatus
     * @return {{
     *      status:Boolean,
     *      error?:Object,
     *      message?:String
     * }} 
     * @memberof Friends
     */
    async insertMessage(dispatcher, recevier, messageValue, messageType, messageStatus) {
        // 存储
        const { app } = this;
        // 获取date
        const date = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
        try {
            await app.mysql.insert(this.MESSAGE_TABLE, {
                dispatcher,
                recevier,
                messageValue,
                messageType,
                messageStatus,
                date
            })
            return {
                status: true,
                message: 'success:ok'
            }
        } catch (error) {
            return {
                status: false,
                message: error
            }
        }
    }
    // 获取所有聊天记录
    /**
     *
     * 获取所有聊天记录 userID target
     * @param {string} userID
     * @param {string} target
     * @return {[data]} 
     * @memberof Friends
     */
    async getAllMessageWithTarget(userID, target) {
        const { app } = this;
        // 获取所有聊天记录
        const data = await app.mysql.query(`select dispatcher,recevier,messageValue,messageType,date from ${this.MESSAGE_TABLE} where (dispatcher=? AND recevier=?) OR (dispatcher=? AND recevier=?) ORDER BY date`, [target, userID, userID, target])
        return data;
    }


    /**
     * 将所有的消息 全部修改为，已经发送 并将其返回
     * 返回未读消息
     * @param {String} recevier
     * @return {{
     *   status:Boolean,
     *   data?:object,
     *   error?:object 
     * }} 
     * @memberof Friends
     */
    async updateMessageRead(recevier) {
        // 存储
        const { app } = this;
        // 获取date
        try {
            const data = await app.mysql.select(this.MESSAGE_TABLE, {
                where: {
                    recevier,
                    messageStatus: '1'
                },
                orders: [['dispatcher', 'asc'], ['id', 'asc']], // 排序方式
            })
            // 修改data的阅读状态为2
            // 先取消修改
            // for (const item of data) {
            //     await app.mysql.update(this.MESSAGE_TABLE, {
            //         id: item.id,
            //         messageStatus: '2'
            //     })
            // }
            // 运行后获取对应的个人资料
            // 首先拿到人
            let obj = {}
            data.forEach(item => {
                if (obj[item.dispatcher]) {
                    obj[item.dispatcher] = {
                        count: obj[item.dispatcher].count + 1,
                        lastMessage: item.messageValue,
                        messageType: item.messageType
                    }
                } else {
                    obj[item.dispatcher] = {
                        count: 1,
                        lastMessage: item.messageValue,
                        messageType: item.messageType
                    }
                }
            })
            let list = [];
            for (let key in obj) {
                list.push(key)
            }
            // 进行查询
            const userInfo = await this.ctx.service.user.getDataByUserID(list)
            for (let user of userInfo) {
                console.log(obj[user.userID]);
                obj[user.userID] = {
                    ...obj[user.userID],
                    ...user
                }
            }
            console.log(obj);
            return {
                status: true,
                obj
            }
        } catch (error) {
            return {
                status: true,
                error
            }
        }
    }

}
module.exports = Friends