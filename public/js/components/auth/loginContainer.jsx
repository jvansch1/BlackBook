import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { login, clearErrors } from '../../actions/sessionActions.js'
import Login from './login.jsx'

const mapStateToProps = (state) => {
  return {
    currentUser: state.session
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (user) => dispatch(login(user)),
    clearErrors: () => dispatch(clearErrors())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login))
