const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const ContactsSchema = new Schema({
  name: String,
  address: String,
  username: String,
  imageUrl: String
})

const Contacts = mongoose.model('Contacts', ContactsSchema);

module.exports = Contacts
