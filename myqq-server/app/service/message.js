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

    // 将所有的消息 全部修改为，已经发送 并将其返回
    /**
     *
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
            for (const item of data) {
                await app.mysql.update(this.MESSAGE_TABLE, {
                    id: item.id,
                    messageStatus: '2'
                })
            }
            return {
                status: true,
                data
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