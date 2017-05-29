import { RECEIVE_USER, RECEIVE_ERRORS } from '../actions/userActions.js'
import merge from 'lodash/merge'


const userReducer = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_USER:
      return action.user
    case RECEIVE_ERRORS:
      let newState = merge({}, state)
      newState.errors = ["Must have a username and password"]
      return newState
    default:
      return state
  }
}

export default userReducer
