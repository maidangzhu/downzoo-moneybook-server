'use strict';

const Controller = require('egg').Controller;

class TypeController extends Controller {
  async list() {
    const { ctx, app } = this;

    const token = ctx.request.header.authorization;
    // 解密 token 中的用户名称
    const decode = await app.jwt.verify(token, app.config.jwt.secret);
    if (!decode || !decode.id) return;
    const user_id = decode.id;

    try {
      const list = await ctx.service.type.list(user_id);

      ctx.body = {
        code: 200,
        msg: '请求成功',
        data: {
          list,
        },
      };
    } catch (e) {
      ctx.body = {
        code: 500,
        msg: '系统错误',
        data: null,
      };
    }
  }
}

module.exports = TypeController;
