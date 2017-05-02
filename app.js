const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const path = require('path')
const mongoose = require('mongoose')
const contactsController = require('./controllers/contactsController.js')
const usersController = require('./controllers/usersController.js')
const bodyParser = require('body-parser')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const Users = require('./models/contactsModel.js')
app.use(bodyParser.urlencoded({ extended: false }))

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (password !== user.password) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

contactsController(app)
usersController(app)
mongoose.connect('mongodb://127.0.0.1/AddressBook')

app.use('/static', express.static(path.resolve(__dirname, 'public')))
app.set('view engine', 'pug')

app.get('/', (req, res) => {
  res.render('index')
})

app.listen(port)
