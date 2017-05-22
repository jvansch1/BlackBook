import { LOGIN, LOGOUT } from '../actions/sessionActions.js'
import merge from 'lodash/merge'


const SessionReducer = (state = {}, action) => {
  debugger
  switch (action.type) {
    case LOGIN:
      return action.user
    case LOGOUT:
      return {}
    case 'persist/REHYDRATE':
      return action.payload.session
    default:
      return state
  }
}

export default SessionReducer
