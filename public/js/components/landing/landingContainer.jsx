import { connect } from 'react-redux';
import { login } from '../../actions/sessionActions.js';
import Landing from './landing.jsx'

const mapDispatchToProps = (dispatch) => {
  return {
    login: (user) => dispatch(login(user))
  }
}

export default connect(null, mapDispatchToProps)(Landing)
