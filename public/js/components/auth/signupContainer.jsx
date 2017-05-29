import { connect } from 'react-redux'
import Signup from './signup.jsx'
import { createUser } from '../../actions/userActions'
import { login } from '../../actions/sessionActions.js'

const mapStateToProps = (state) => {
  return {
    currentUser: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createUser: (user) => dispatch(createUser(user)),
    login: (user) => dispatch(login(user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup)
