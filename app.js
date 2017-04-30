const express = require('express')
const app = express()
const port = process.env.PORT || 3000
app.listen(port)

app.use('/static', express.static(__dirname + 'public'))
app.set('view engine', 'pug')

app.get('/', (req, res) => {
  res.render('index')
})
