import { connect } from 'react-redux'
import contactsShow from './contactsShow.jsx'
import { fetchOneContact } from '../../actions/contactActions.js'

const mapStateToProps = (state, ownProps) => {
  debugger
  return {
    contact: state.contacts,
    id: ownProps.routeParams.id
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchOneContact: (id) => dispatch(fetchOneContact(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(contactsShow)
