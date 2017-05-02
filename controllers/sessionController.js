const passport = require('passport')

module.exports = (app) => {

  app.post('/login', passport.authenticate('local', { session: false }), (req, res) => {
    res.send(req.body)
  })

}
