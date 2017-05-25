import { RECEIVE_CONTACTS, RECEIVE_CONTACT, RECEIVE_ONE_CONTACT } from '../actions/contactActions.js'
import merge from 'lodash/merge'

const contactsReducer = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_CONTACTS:
      return action.contacts
    case RECEIVE_CONTACT:
      let newState = merge({}, state, { [action.contact._id]: action.contact })
      return newState
    case RECEIVE_ONE_CONTACT:
      return action.contact
    default:
      return state
  }
}

export default contactsReducer
