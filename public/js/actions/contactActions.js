import * as ContactsApiUtil from '../util/contactsApiUtil.js'

export const RECEIVE_CONTACTS = 'RECEIVE_CONTACTS'
export const RECEIVE_CONTACT = 'RECEIVE_CONTACT'
export const RECEIVE_ONE_CONTACT = 'RECEIVE_ONE_CONTACT'

export const receiveContacts = (contacts) => ({
  type: RECEIVE_CONTACTS,
  contacts
})

export const receiveContact = (contact) => ({
  type: RECEIVE_CONTACT,
  contact
})

export const receiveOneContact = (contact) => ({
  type: RECEIVE_ONE_CONTACT,
  contact
})

export const fetchContacts = (username) => {
  return dispatch => {
    return ContactsApiUtil.fetchContacts(username)
      .then(contacts => dispatch(receiveContacts(contacts)))
  }
}

export const fetchContact = (id) => {
  return dispatch => {
    return ContactsApiUtil.fetchContact(id)
      .then(contact => dispatch(receiveContact(contact)))
  }
}
export const fetchOneContact = (id) => {
  return dispatch => {
    return ContactsApiUtil.fetchContact(id)
      .then(contact => dispatch(receiveOneContact(contact)))
  }
}

export const createContact = (contact) => {
  return dispatch => {
    return ContactsApiUtil.createContact(contact)
      .then(contact => {
        return dispatch(receiveContact(contact))
      })
  }
}

export const updateContact = (contact) => {
  return dispatch => {
    return ContactsApiUtil.updateContact(contact)
      .then(contact => dispatch(receiveOneContact(contact)))
  }
}
