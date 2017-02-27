const db = require('./_db');

const Place = db.define('place', {
  lat: db.Sequelize.DECIMAL,
  lng: db.Sequelize.DECIMAL,
  name: db.Sequelize.STRING
});

module.exports = Place;
