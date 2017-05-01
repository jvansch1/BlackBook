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

  app.get('/api/contacts/:id', (req, res) => {
    Contacts.findById(req.params.id, (err, contact) => {
      if (err) {
        res.status(500).send(err)
      }
      else {
        res.send(contact)
      }
    })
  })

  app.post('/api/contacts', (req, res) => {
    let newContact = Contacts({
      name: req.body.name,
      address: req.body.address
    })
    newContact.save((err, newCreatedContact) => {
      if (err) {
        res.status(500).send(err)
      }
      else {
        res.send(newCreatedContact)
      }
    })
  })
}
