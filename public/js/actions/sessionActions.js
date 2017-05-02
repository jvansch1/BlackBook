import * as sessionApiUtil from '../util/sessionApiUtil.js'

export const LOGIN = 'LOGIN'

export const receiveUser = (user) => ({
  type: LOGIN,
  user
})

export const login = (user) => {
  return dispatch => {
    sessionApiUtil.login(user)
      .then(user => dispatch(receiveUser(user)))
  }
}
