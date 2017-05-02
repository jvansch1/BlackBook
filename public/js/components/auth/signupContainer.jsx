import { connect } from 'react-redux'
import Signup from './signup.jsx'
import { createUser } from '../../actions/userActions'

const mapStateToProps = (state) => {
  return {

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createUser: (user) => dispatch(createUser(user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup)
