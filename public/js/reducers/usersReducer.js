import { RECEIVE_USER } from '../actions/userActions.js'


const userReducer = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_USER:
      return action.user
    default:
      return state
  }
}

export default userReducer
