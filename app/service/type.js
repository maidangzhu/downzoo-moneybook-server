'use strict';
const Service = require('egg').Service;

class TypeService extends Service {
  async list(user_id) {
    const { app } = this;
    const QUERY_STR = 'id, name, type, user_id';
    const sql = `select ${QUERY_STR} from type where user_id = 0 or user_id = ${user_id};`;

    try {
      return await app.mysql.query(sql);
    } catch (e) {
      console.error(e);
      return null;
    }
  }
}

module.exports = TypeService;
