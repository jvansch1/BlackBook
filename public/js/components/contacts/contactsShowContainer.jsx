import { connect } from 'react-redux'
import contactsShow from './contactsShow.jsx'
import { withRouter } from 'react-router-dom'
import { fetchOneContact, updateContact, deleteContact } from '../../actions/contactActions.js'

const mapStateToProps = (state, ownProps) => {
  debugger
  return {
    contact: state.contacts,
    id: ownProps.match.params.id
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchOneContact: (id) => dispatch(fetchOneContact(id)),
    updateContact: (contact) => dispatch(updateContact(contact)),
    deleteContact: (id) => dispatch(deleteContact(id))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(contactsShow))
