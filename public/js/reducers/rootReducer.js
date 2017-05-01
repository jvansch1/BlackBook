import { combineReducers } from 'redux'
import contactsReducer from './contactsReducer.js'

const rootReducer = combineReducers({
  contacts: contactsReducer
})

export default rootReducer
