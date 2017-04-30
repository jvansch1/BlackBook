const Contacts = require('../models/contactsModel.js')

module.exports = (app) => {

  app.get('/api/contacts', (req, res) => {
    Contacts.find((err, todos) => {
      if (err) {
        res.status(500).send(err)
      }
      else {
        res.send(todos)
      }
    })
  })

}
