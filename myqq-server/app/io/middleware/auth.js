const room = 'default_room';
module.exports = app => {
    return async (ctx, next) => {
        // 验证当前登录的用户的有效性 
        // 1. 检查参数token是否完整
        const { token } = ctx.query
        if (!token) {
            // 无效则踢出去并且终止进程
            ctx.socket.disconnect();
            return
        }
        // 2. 从token里面解码获取userID
        let userID = app.jwt.verify(token, app.config.jwt.secret).userID
        if (!userID) {
            ctx.socket.disconnect();
            return
        }
        // 检查数据库中是否有该用户
        let userInDB = await app.mysql.get('user', { userID });
        // 通过则说明为有效用户
        if (userInDB) {
            console.log(userID + '已经连接')
            // 给当前socket绑定userID，以便于之后获取
            ctx.socket.userID = userID;
            ctx.socket.emit('login', { message: "验证成功", status: true, userID })
        } else {
            // 无效则踢出去并且终止进程
            ctx.socket.disconnect();
            return
        }
        await next();
        console.log(userID + '已经断开')
    }
}