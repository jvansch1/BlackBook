import { combineReducers } from 'redux'
import contactsReducer from './contactsReducer.js'
import userReducer from './userReducer.js'

const rootReducer = combineReducers({
  contacts: contactsReducer,
  user: userReducer
})

export default rootReducer
