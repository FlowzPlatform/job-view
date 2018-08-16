/* eslint-disable no-unused-vars */

class Service {
  constructor(options) {
    this.options = options || {};
  }

  find(params) {
    return Promise.resolve([]);

  }

  get(id, params) {
    return Promise.resolve({
      id,
      text: `A new message with ID: ${id}!`
    });
  }

  create(data, params, callback) {
    // if (Array.isArray(data)) {
    //   return Promise.all(data.map(current => this.create(current)));
    // }
    console.log('Create', data)
    let r = require('rethinkdbdash')({
      port: data.port,
      host: data.host,
      db: data.database
    });
    let result = r.table(data.tablename).run().then(function (result) {
      if (result.length > 0) {
        if (result[0].hasOwnProperty('queueId') && result[0].hasOwnProperty('status') && result[0].hasOwnProperty('priority')) {
          return result;
        } else {
          let e = {
            iserror: true,
            msg: "Table is not a JobQueue Table"
          }
          console.log(e);
          return e;
        }
      } else {
        result = []
      }
    }).catch(err => {
      console.log('Error:', err)
      return err
    })
    return Promise.resolve(result).then(resp => {
      if (typeof resp == 'object' && resp.hasOwnProperty('iserror') && resp.iserror) {
        console.log('*************************************')
        let e = new Error(resp.msg)
        return e;
      }
      return resp
    }).catch(err => {
      return err
    });
  }

  update(id, data, params) {
    return Promise.resolve(data);
  }

  patch(id, data, params) {
    return Promise.resolve(data);
  }

  remove(id, params) {
    return Promise.resolve({
      id
    });
  }
}

module.exports = function (options) {
  return new Service(options);
};

module.exports.Service = Service;
