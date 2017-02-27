const db = require('./_db');
const Place = require('./Place');
const Office = require('./Office');
const Store = require('./Store');

Office.belongsTo(Place);
Store.belongsTo(Place);

const sync = ()=> db.sync({ force: true }); 

const seed = ()=> {
  const places = [
    { name: 'statue of liberty', lat: 40.689249, lng: -74.044500},
    { name: 'empire state building', lat: 40.748441, lng: -73.985664},
    { name: 'full stack academy', lat: 40.705076, lng: -74.009160},
  ];
  //create 3 places 
  /*  [{ name: 'statue of liberty', lat: 40.689249, lng: -74.044500}]
   */
  //  Statue of Liberty
  //  Empire State Building,
  //  Full Stack
  //create 2 stores
  //  statue of liberty store
  //  empire state building store
  //create 2 offices
  //  full stack office
  //  empire state building office
  let statueOfLiberty, empireStateBuilding, fullStack;
  return sync()
    .then( ()=> places.map( place => Place.create(place)))
    .then( (promises) => Promise.all(promises))
    .then( (result) => [ statueOfLiberty, empireStateBuilding, fullStack ] = result)
    .then( ()=> Promise.all([
        Office.create({ placeId: fullStack.id, name: 'FS Office'}),
        Office.create({ placeId: empireStateBuilding.id, name: 'ES Office'}),
        Store.create({ placeId: statueOfLiberty.id, name: 'SL Store'}),
        Store.create({ placeId: empireStateBuilding.id, name: 'ES Store'})
    ]));
};

module.exports = {
  seed,
  models: {
    Place,
    Office,
    Store
  }
};
