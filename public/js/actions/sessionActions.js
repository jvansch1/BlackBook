import * as sessionApiUtil from '../util/sessionApiUtil.js'

export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'
export const RECEIVE_ERRORS = 'RECEIVE_ERRORS'
export const CLEAR_ERRORS = 'CLEAR_ERRORS'

export const receiveUser = (user) => ({
  type: LOGIN,
  user
})

export const logout = () => ({
  type: LOGOUT,
  user: null,
})

export const receiveErrors = (errors) => ({
  type: RECEIVE_ERRORS,
  errors
})

export const removeErrors = (errors) => ({
  type: CLEAR_ERRORS
})

export const login = (user) => {
  console.log(user)
  return dispatch => {
    return sessionApiUtil.login(user)
      .then(user => dispatch(receiveUser(user)), err => dispatch(receiveErrors(err)))
  }
}

export const clearErrors = () => {
  return dispatch => {
    return dispatch(removeErrors())
  }
}

export const logoutUser = (user) => {
  return dispatch => {
    return sessionApiUtil.login(user)
      .then(user => dispatch(logout()))
  }
}
