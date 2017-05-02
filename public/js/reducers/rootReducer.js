import { combineReducers } from 'redux'
import contactsReducer from './contactsReducer.js'
import usersReducer from './usersReducer.js'

const rootReducer = combineReducers({
  contacts: contactsReducer,
  user: usersReducer
})

export default rootReducer
