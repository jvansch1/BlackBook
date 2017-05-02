import { connect } from 'react-redux'
import { logoutUser } from '../../actions/sessionActions.js'
import Header from './header.jsx'

const mapDispatchToProps = (dispatch) => {
  return {
    logout: (user) => dispatch(logoutUser(user))
  }
}

export default connect(null, mapDispatchToProps)(Header)
