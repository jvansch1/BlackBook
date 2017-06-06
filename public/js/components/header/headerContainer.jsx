import { connect } from 'react-redux'
import { logoutUser } from '../../actions/sessionActions.js'
import Header from './header.jsx'
import { withRouter } from 'react-router-dom'

const mapDispatchToProps = (dispatch) => {
  return {
    logout: (user) => dispatch(logoutUser(user))
  }
}

export default withRouter(connect(null, mapDispatchToProps)(Header))
