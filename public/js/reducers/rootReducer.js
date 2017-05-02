import { combineReducers } from 'redux'
import contactsReducer from './contactsReducer.js'
import usersReducer from './usersReducer.js'
import sessionReducer from './sessionReducer.js'

const rootReducer = combineReducers({
  contacts: contactsReducer,
  user: usersReducer,
  session: sessionReducer
})

export default rootReducer
