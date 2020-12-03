const Service = require('egg').Service;
// 继承Service
/**存放一些socket公用的函数方法 */
class Common extends Service {
    /**
     *
     * 返回userID绑定的那个socket
     * @param {string} target
     * @memberof Common
     */
    async getTargetSocket(target) {
        return new Promise((resolve, reject) => {
            const { app } = this;
            let conn = app.io.of('/')
            // 找到要发送的目标用户 并进行发送 
            conn.clients((error, clients) => {
                if (error) {
                    throw error;
                }

                for (let client of clients) {
                    // 找到了就发送消息并且退出
                    if (conn.sockets[client].userID === target) {
                        // 获取resolve
                        resolve(conn.sockets[client])
                    }
                }
                resolve(null)
            });

        })
    }

}
module.exports = Common