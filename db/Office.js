const db = require('./_db');

const Office = db.define('office', {
  name: db.Sequelize.STRING
});

module.exports = Office;
