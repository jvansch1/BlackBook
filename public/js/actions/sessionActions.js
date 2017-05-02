import * as sessionApiUtil from '../util/sessionApiUtil.js'

export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'

export const receiveUser = (user) => ({
  type: LOGIN,
  user
})

export const logout = () => ({
  type: LOGOUT,
  user: null
})

export const login = (user) => {
  return dispatch => {
    return sessionApiUtil.login(user)
      .then(user => dispatch(receiveUser(user)))
  }
}

export const logoutUser = (user) => {
  return dispatch => {
    return sessionApiUtil.login(user)
      .then(user => dispatch(logout()))
  }
}
