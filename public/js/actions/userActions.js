import * as userApiUtil from '../util/userApiUtil.js'

export const RECEIVE_USER = 'RECEIVE_USER'
export const RECEIVE_ERRORS = 'RECEIVE_ERRORS'
export const CLEAR_ERRORS = 'CLEAR_ERRORS'

export const receiveUser = (user) => ({
  type: RECEIVE_USER,
  user
})

export const receiveErrors = (errors) => ({
  type: RECEIVE_ERRORS,
  errors
})

export const removeErrors = (errors) => ({
  type: CLEAR_ERRORS
})

export const createUser = (user) => {
  return dispatch => {
    return userApiUtil.createUser(user)
      .then(user => dispatch(receiveUser(user)),
        err => dispatch(receiveErrors(err)))
  }
}

export const clearErrors = () => {
  return dispatch => {
    return dispatch(removeErrors())
  }
}
