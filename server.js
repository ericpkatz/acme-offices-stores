const express = require('express');
const db = require('./db');
const swig = require('swig');
const path = require('path');
swig.setDefaults( { cache: false });

const app = express();
app.set('view engine', 'html');
app.engine('html', swig.renderFile);

app.use('/vendor', express.static(path.join(__dirname, 'node_modules')));

db.seed()
  .then( ()=> console.log('seeded'));

app.get('/', (req, res, next)=> {
  Promise.all([
      db.models.Office.findAll({
        include: [ db.models.Place ]
      }),
      db.models.Store.findAll({
        include: [ db.models.Place ]
      })
  ])
  .then( result => {
    [ offices, stores ] = result;
    res.render('index', {
      offices, stores
    });
  })
  .catch( next );

});

 
const port = process.env.PORT || 3000;
app.listen(port, ()=> console.log(`listening on port ${port}`));


