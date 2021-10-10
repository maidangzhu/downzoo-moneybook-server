'use strict';
const Service = require('egg').Service;

class BillService extends Service {
  async add(params) {
    const { app } = this;

    try {
      return await app.mysql.insert('bill', params);
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  async list(id) {
    const { app } = this;
    const QUERY_STR = 'id, pay_type, amount, date, type_id, type_name, remark';
    const sql = `select ${QUERY_STR} from bill where user_id = ${id};`;

    try {
      return await app.mysql.query(sql);
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  async detail(id, user_id) {
    const { app } = this;

    try {
      return await app.mysql.get('bill', { id, user_id });
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  async update(params) {
    const { app } = this;
    const { id, user_id } = params;

    try {
      return await app.mysql.update('bill', {
        ...params,
      }, { id, user_id });
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  async delete(id, user_id) {
    const { app } = this;

    try {
      return await app.mysql.delete('bill', { id, user_id });
    } catch (e) {
      console.error(e);
      return null;
    }
  }
}

module.exports = BillService;
