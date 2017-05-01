const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const path = require('path')
const mongoose = require('mongoose')
const contactsController = require('./controllers/contactsController.js')
const usersController = require('./controllers/usersController.js')
const bodyParser = require('body-parser')
const passport = require('passport')
const localStrategy = require('passport-local').Strategy;
app.use(bodyParser.urlencoded({ extended: false }))

contactsController(app)
usersController(app)
mongoose.connect('mongodb://127.0.0.1/AddressBook')

app.use('/static', express.static(path.resolve(__dirname, 'public')))
app.set('view engine', 'pug')

app.get('/', (req, res) => {
  res.render('index')
})

app.listen(port)
