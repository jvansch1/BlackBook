import { LOGIN, LOGOUT, RECEIVE_ERRORS, CLEAR_ERRORS } from '../actions/sessionActions.js'
import merge from 'lodash/merge'


const SessionReducer = (state = {}, action) => {
  switch (action.type) {
    case LOGIN:
      return action.user
    case LOGOUT:
      return {}
    case 'persist/REHYDRATE':
      let persisted = action.payload.session
      persisted.errors = [];
      return persisted
    case RECEIVE_ERRORS:
      let newState = merge({}, state)
      newState.errors = ["Invalid username or password"]
      return newState
    case CLEAR_ERRORS:
      let updatedState = merge({}, state)
      updatedState.errors = [];
      return updatedState
    default:
      return state
  }
}

export default SessionReducer
