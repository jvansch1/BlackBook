import { connect } from 'react-redux'
import { login } from '../../actions/sessionActions.js'
import Login from './login.jsx'

const mapStateToProps = (state) => {
  return {
    currentUser: state.session
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (user) => dispatch(login(user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
