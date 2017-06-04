import { connect } from 'react-redux';
import { login, clearErrors, logout } from '../../actions/sessionActions.js';
import Landing from './landing.jsx'

const mapStateToProps = (state) => {
  return {
    currentUser: state.session
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (user) => dispatch(login(user)),
    clearErrors: () => dispatch(clearErrors()),
    logout: () => dispatch(logout())
  }
}

export default connect(null, mapDispatchToProps)(Landing)
