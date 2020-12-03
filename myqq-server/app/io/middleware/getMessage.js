// 在连接的时候获取所有未读消息
module.exports = app => {
    return async (ctx, next) => {
        // console.log('获取未读消息')
        // 获取socketID
        const userID = ctx.socket.userID
        //  进行查询
        const data = await ctx.service.message.updateMessageRead(userID);
        ctx.socket.emit('loginMessage', data)
        await next();
    }
}