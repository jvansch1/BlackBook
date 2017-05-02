import { LOGIN } from '../actions/sessionActions.js'
import merge from 'lodash/merge'


const SessionReducer = (state = {}, action) => {
  switch (action.type) {
    case LOGIN:
      return action.user
    case 'persist/REHYDRATE':
      return action.payload.session
    default:
      return state
  }
}

export default SessionReducer
