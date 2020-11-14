// {app_root}/app/io/controller/default.js
'use strict';

const Controller = require('egg').Controller;

class DefaultController extends Controller {
  async groupConnect() {
    await ctx.socket.emit('res', 'ok');
   
  }
}

module.exports = DefaultController;