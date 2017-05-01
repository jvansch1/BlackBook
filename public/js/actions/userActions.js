import * as userApiUtil from '../util/userApiUtil.js'

export const RECEIVE_USER = 'RECEIVE_USER'

export const receiveUser = (user) => ({
  type: RECEIVE_USER,
  user
})

export const createUser = (user) => {
  return dispatch => {
    return userApiUtil.createUser(user)
      .then(user => dispatch(receiveUser(user)))
  }
}
