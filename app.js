const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const path = require('path')
const mongoose = require('mongoose')
const contactsController = require('./controllers/contactsController.js')
const usersController = require('./controllers/usersController.js')
const sessionController = require('./controllers/sessionController.js')
const bodyParser = require('body-parser')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const Users = require('./models/userModel.js')
const session = require('express-session')
const aws = require('aws-sdk')

app.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }))

app.use(session({
    secret: 'keyboard cat',
    name: 'user',
    proxy: true,
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize())
app.use(passport.session())


passport.use(new LocalStrategy(
  function(username, password, done) {
    Users.findOne({ username: username }, function (err, user) {
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

passport.serializeUser(function(user, done) {
  done(null, user.username);
});

passport.deserializeUser(function(username, done) {
  Users.findOne({username: username}, function(err, user) {
    done(err, user);
  });
});

contactsController(app)
usersController(app)
sessionController(app)
mongoose.connect('mongodb://jvansch1:Mrxbox53092@ds155091.mlab.com:55091/blackbook')

app.use('/static', express.static(path.resolve(__dirname, 'public')))
app.set('view engine', 'pug')

app.get('/', (req, res) => {
  res.render('index')
})

app.listen(port)
