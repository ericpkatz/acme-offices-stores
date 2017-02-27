const db = require('./_db');

const Store = db.define('store', {
  name: db.Sequelize.STRING
});

module.exports = Store;
