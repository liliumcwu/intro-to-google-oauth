require('dotenv').config();
const express = require('express'),
hbs = require('express-handlebars'),
bodyParser = require('body-parser'),
app = express(),
session = require('express-session');

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'main', layoutsDir: __dirname + '/views/layouts/'}));
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));

app.get('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));
app.use('/profile', require('./routes/profile'));
app.use('/logout', require('./routes/logout'));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
  console.log('CLIENT_ID is', CLIENT_ID);
  console.log('CLIENT_SECRET is', CLIENT_SECRET);
});
