'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    this.ctx.body = `<h1 style="color:green;text-align:center;">本服务正在运行</h1>`;
  }
}

module.exports = HomeController;
