import * as ContactsApiUtil from '../util/contactsApiUtil.js'

export const RECEIVE_CONTACTS = 'RECEIVE_CONTACTS'
export const RECEIVE_CONTACT = 'RECEIVE_CONTACT'

export const receiveContacts = (contacts) => ({
  type: RECEIVE_CONTACTS,
  contacts
})

export const receiveContact = (contact) => ({
  type: RECEIVE_CONTACT,
  contact
})

export const fetchContacts = () => {
  return dispatch => {
    return ContactsApiUtil.fetchContacts()
      .then(contacts => dispatch(receiveContacts(contacts)))
  }
}

export const createContact = (contact) => {
  return dispatch => {
    return ContactsApiUtil.createContact(contact)
      .then(contact => {
        console.log(contact)
        return dispatch(receiveContact(contact))
      })
  }
}
