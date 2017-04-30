const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const path = require('path')
const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1/AddressBook')

app.use('/static', express.static(path.resolve(__dirname, 'public')))
app.set('view engine', 'pug')

app.get('/', (req, res) => {
  res.render('index')
})

app.listen(port)
