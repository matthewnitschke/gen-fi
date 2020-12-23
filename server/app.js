const path = require('path');

const bodyParser = require('body-parser');
const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');
const authentication = require('./middleware/authentication');

const app = express();
const port = 8080;

(async () => {
  await require('./db')(); // ensure db is initialized

  app.use(
    session({
      secret: 'process.env.SESSION_SECRET',
      store: new MongoStore({ mongooseConnection: mongoose.connection }),
    })
  );

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  app.use('/login', require('./controllers/login'));

  app.use(authentication);

  // static assets
  app.use('/', express.static(path.join(__dirname, '../client/dist')));

  app.use('/budget', require('./controllers/api/budget'));
  app.use('/transactions', require('./controllers/api/transactions'));

  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
})();
