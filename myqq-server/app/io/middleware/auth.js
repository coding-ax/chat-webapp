const room = 'default_room';
module.exports = app => {
    return async (ctx, next) => {
        ctx.socket.join(room);
        ctx.socket.on('connect', () => {
            ctx.socket.emit("res", 'hello')
            ctx.app.io.of('/').to(room).emit('res', { msg: 'welcome', id: ctx.socket.id });
        })
        ctx.socket.emit("res", "ok")
        ctx.socket.on('res', (mes) => {
            console.log(mes)
            ctx.socket.emit("res", mes)
            // ctx.app.io.of('/').to(room).emit('res', mes);
           
        })
        // console.log(app)
        await next();
    }
}