const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const ContactsSchema = new Schema({
  name: String,
  address: String
})

const Contacts = mongoose.model('Contacts', ContactsSchema);

module.exports = Contacts
