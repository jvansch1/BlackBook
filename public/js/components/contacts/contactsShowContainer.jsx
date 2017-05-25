import { connect } from 'react-redux'
import contactsShow from './contactsShow.jsx'
import { fetchOneContact, updateContact } from '../../actions/contactActions.js'

const mapStateToProps = (state, ownProps) => {
  return {
    contact: state.contacts,
    id: ownProps.routeParams.id
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchOneContact: (id) => dispatch(fetchOneContact(id)),
    updateContact: (contact) => dispatch(updateContact(contact))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(contactsShow)
