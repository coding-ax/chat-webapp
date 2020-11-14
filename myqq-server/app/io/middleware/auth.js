const room = 'default_room';
module.exports = app => {
    return async (ctx, next) => {
        // 判断当前聊天场景 userID 用户id type:1 群发 2 私聊 target=对方的id号或者群id
        const { userID, type, target } = ctx.query
        console.log(userID, type, target)
        // 判断是否为有效用户 不是就断开
        let user = await app.mysql.get('user', { userID });
        let targetUser = await app.mysql.get('user', { userID: target });
        // 二者皆为有效用户
        if (user && targetUser) {
            ctx.socket.emit('res', { message: "验证通过" })
        } else {
            // 无效则踢出去并且终止进程
            ctx.socket.disconnect();
            return
        }
        console.log(user, targetUser)
       
        await next();
        console.log("disconnect")
    }
}