import { combineReducers } from 'redux'
import contactsReducer from './contactsReducer.js'
import usersReducer from './usersReducer.js'
import sessionReducer from './sessionReducer.js'
import persistReducer from './persistReducer.js'

const rootReducer = combineReducers({
  contacts: contactsReducer,
  user: usersReducer,
  session: sessionReducer,
  persist: persistReducer
})

export default rootReducer
