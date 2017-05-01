import { RECEIVE_CONTACTS } from '../actions/contactActions.js'

const contactsReducer = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_CONTACTS:
      return action.contacts
    default:
      return state
  }
}

export default contactsReducer
