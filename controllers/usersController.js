const Users = require('../models/userModel.js')

module.exports = (app) => {

  app.get('/api/users', (req,res) => {
    Users.find((err, users) => {
      if (err) {
        res.send(500).send(err)
      }
      else {
        res.send(users)
      }
    })
  })

  app.post('/api/users', (req,res) => {
    let newUser = Users({
      username: req.body.username,
      password: req.body.password
    })
    newUser.save((err, object) => {
      if (err) {
        console.log(err)
        res.status(500).send(err)
      }
      else {
        res.send(object)
      }
    })
  })

}
