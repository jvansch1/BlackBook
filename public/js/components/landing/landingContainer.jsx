import { connect } from 'react-redux';
import { login, clearErrors } from '../../actions/sessionActions.js';
import Landing from './landing.jsx'

const mapDispatchToProps = (dispatch) => {
  return {
    login: (user) => dispatch(login(user)),
    clearErrors: () => dispatch(clearErrors())
  }
}

export default connect(null, mapDispatchToProps)(Landing)
