import { connect } from 'react-redux';
import { login, clearErrors, logoutUser } from '../../actions/sessionActions.js';
import Landing from './landing.jsx'
import { withRouter } from 'react-router-dom'

const mapStateToProps = (state) => {
  return {
    currentUser: state.session
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (user) => dispatch(login(user)),
    clearErrors: () => dispatch(clearErrors()),
    logout: (user) => dispatch(logoutUser(user))
  }
}

export default withRouter(connect(null, mapDispatchToProps)(Landing))
