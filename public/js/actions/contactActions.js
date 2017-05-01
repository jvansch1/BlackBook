import * as ContactsApiUtil from '../util/contactsApiUtil.js'

export const RECEIVE_CONTACTS = 'RECEIVE_CONTACTS'

export const receiveContacts = (contacts) => ({
  type: RECEIVE_CONTACTS,
  contacts
})

export const fetchContacts = () => {
  return dispatch => {
    return ContactsApiUtil.fetchContacts()
      .then(contacts => dispatch(receiveContacts(contacts)))
  }
}
