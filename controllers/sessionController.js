const passport = require('passport')

module.exports = (app) => {

  app.post('/login', passport.authenticate('local'), (req, res) => {
    console.log(req)
    res.send(req.body)
  })

}
