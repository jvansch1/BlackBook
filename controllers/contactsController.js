const Contacts = require('../models/contactsModel.js')

module.exports = (app) => {

  app.get('/api/contacts', (req, res) => {
    console.log(req._parsedOriginalUrl.query)
    let username = req._parsedOriginalUrl.query
    Contacts.find({username: username}, (err, contacts) => {
      if (err) {
        res.status(500).send(err)
      }
      else {
        res.send(contacts)
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
      address: req.body.address,
      username: req.body.username,
      imageUrl: req.body.imageUrl,
      email: req.body.email,
      notes: req.body.notes,
      phone: req.body.phone
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

  app.put('/api/contacts/:id', (req, res) => {
    console.log(req.params.id)
    Contacts.findById(req.params.id, (err, contact) => {
      contact.name = req.body.name
      contact.address = req.body.address
      contact.email = req.body.email
      contact.phone = req.body.phone
      contact.notes = req.body.notes
      contact.imageUrl = req.body.imageUrl
      if (err) {
        res.status(500).send(err)
      } else {
        contact.save((err, contact) => {
          if (err) {
            res.status(500).send(err)
          } else {
            res.send(contact)
          }
        })
      }
    })
  })
}
