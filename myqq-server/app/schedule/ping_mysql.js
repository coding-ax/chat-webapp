const Subscription = require('egg').Subscription;

class PingMySQL extends Subscription {
    // 通过 schedule 属性来设置定时任务的执行间隔等配置
    static get schedule() {
        return {
            interval: '1h', // 1 h间隔
            type: 'all', // 指定所有的 worker 都需要执行
        };
    }

    // subscribe 是真正定时任务执行时被运行的函数
    async subscribe() {
        //保活
        let resPing = await this.ctx.app.mysql.get('user', { id: 1 });
        console.log(new Date().toLocaleTimeString() + "   " + resPing);
    }
}

module.exports = PingMySQL;