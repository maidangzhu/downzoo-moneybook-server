'use strict';
const Service = require('egg').Service;

class UserService extends Service {
  async getUserByName(username) {
    const { app } = this;

    try {
      return app.mysql.get('user', {
        username,
      });
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  async register(params) {
    const { app } = this;
    const {
      username,
      password,
      signature,
      avatar,
      ctime,
    } = params;

    try {
      return await app.mysql.insert('user', {
        username,
        password,
        signature,
        avatar,
        ctime,
      });
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  // 修改用户信息
  async editUserInfo(params) {
    const { app } = this;
    try {
      // 通过 app.mysql.update 方法，指定 user 表，
      return await app.mysql.update('user', {
        ...params,
      }, {
        id: params.id,
      });
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  // 修改密码
  async modifyPass(params) {
    const { app } = this;
    try {
      return await app.mysql.update('user', {
        ...params,
      }, {
        id: params.id,
      });
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}

module.exports = UserService;
