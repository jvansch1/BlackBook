import { LOGIN } from '../actions/sessionActions.js'


const SessionReducer = (state = {}, action) => {
  switch (action.type) {
    case LOGIN:
      return action.user
    default:
      return state
  }
}

export default SessionReducer
